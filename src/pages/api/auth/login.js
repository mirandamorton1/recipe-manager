import prisma from "../../../../prisma/prisma";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../../../utils/logger";
import speakeasy from "speakeasy";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const HASH_ALGORITHM = "sha256";

const temp2FAStore = new Map();

const hashPassword = (password, salt) => {
  return crypto.createHmac(HASH_ALGORITHM, salt).update(password).digest("hex");
};

const verifyPassword = (storedHash, storedSalt, password) => {
  const hash = hashPassword(password, storedSalt);
  return hash === storedHash;
};

const loginHandler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password, twoFAToken } = req.body;

    const sanitizedEmail = `${email.split("@")[0][0]}*****@${
      email.split("@")[1]
    }`;

    const sanitizedName = "User";

    logger.info(`Login attempt for user: ${sanitizedEmail} (${sanitizedName})`);

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      logger.info(
        `[INFO] Found user: ${user ? sanitizedEmail : "User not found"}`
      );

      if (!user) {
        logger.warn("[WARN] User not found:", { email: sanitizedEmail });
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // logger.info(`[INFO] Stored password hash: ${user.password}`);
      // logger.info(`[INFO] Stored salt: ${user.salt}`);

      if (!user.isActive) {
        return res
          .status(403)
          .json({ error: "Your account is inactive. Please contact support." });
      }

      const isPasswordValid = verifyPassword(
        user.password,
        user.salt,
        password
      );

      logger.info(
        `[INFO] Password verification result for email: ${sanitizedEmail} - ${
          isPasswordValid ? "Success" : "Failure"
        }`
      );

      if (!isPasswordValid) {
        logger.warn("[WARN] Invalid password for email:", {
          email: sanitizedEmail,
        });
        return res.status(401).json({ message: "Invalid email or password" });
      }
      let generatedTwoFACode;
     
      if (user.twoFaSecret) {
        const now = Date.now();

        const stored2FA = temp2FAStore.get(email);
        if (!stored2FA || stored2FA.expiry < now) {
          generatedTwoFACode = speakeasy.totp({
            secret: user.twoFaSecret,
            encoding: "base32",
          });
          logger.info(
            `[DEBUG] Generated 2FA Code for ${sanitizedEmail}: ${generatedTwoFACode}`
          );

          temp2FAStore.set(email, {
            code: generatedTwoFACode,
            expiry: now + 5 * 60 * 1000, 
          });

          return res.status(401).json({ error: "2FA required" });
        }

        if (!twoFAToken) {
          return res.status(401).json({ error: "2FA required" });
        }

        logger.info(`[DEBUG] Generated 2FA Code: ${generatedTwoFACode}`);
        logger.info(`[DEBUG] Provided 2FA Code: ${twoFAToken}`);

        const verified = speakeasy.totp.verify({
          secret: user.twoFaSecret,
          encoding: "base32",
          token: twoFAToken,
          window: 1,
        });

  logger.info(`[DEBUG] 2FA Verification Result: ${verified}`);

        if (!verified) {
          return res.status(401).json({ error: "Invalid 2FA code" });
        }

        temp2FAStore.delete(email);
      }
    let token;

      try {
        token = jwt.sign(
          { userId: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
        logger.info(`[DEBUG] JWT token created: ${token}`);
      } catch (err) {
        logger.error(`[ERROR] JWT creation failed: ${err.message}`);
        return res.status(500).json({ error: "JWT creation failed" });
      }
      

      res.setHeader(
        "Set-Cookie",
        `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax; Secure=${
          process.env.NODE_ENV === "production"
        }`
      );

      logger.info(
        `Login successful for user: ${sanitizedEmail} (${sanitizedName})`
      );
      return res
        .status(200)
        .json({ token, user: { id: user.id, role: user.role } });
    } catch (error) {
      logger.error(`[ERROR] Login handler error:", ${error.message}`);
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default loginHandler;
