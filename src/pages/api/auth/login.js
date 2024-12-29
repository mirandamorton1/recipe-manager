import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const HASH_ALGORITHM = "sha256";

const hashPassword = (password, salt) => {
  return crypto.createHmac(HASH_ALGORITHM, salt).update(password).digest("hex");
};

const verifyPassword = (storedHash, storedSalt, password) => {
  const hash = hashPassword(password, storedSalt);
  return hash === storedHash;
};

const loginHandler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      console.log(`[INFO] ${req.method} request to ${req.url}`);

      const user = await prisma.user.findUnique({
        where: { email },
      });

      console.log(`[INFO] Found user: ${user ? user.email : "User not found"}`);

      if (!user) {
        console.log(`[WARN] User not found: ${email}`);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      console.log(`[INFO] Stored password hash: ${user.password}`);
      console.log(`[INFO] Stored salt: ${user.salt}`);

      const isPasswordValid = verifyPassword(
        user.password,
        user.salt,
        password
      );
      console.log(
        `[INFO] Password verification result: ${
          isPasswordValid ? "Success" : "Failure"
        }`
      );

      if (!isPasswordValid) {
        console.log(`[WARN] Invalid password for email: ${email}`);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      console.log(`[INFO] Successful login for email: ${email}`);

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.setHeader(
        "Set-Cookie",
        `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure`
      );

      console.log(`[INFO] Login successful for user ID: ${user.id}`);
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("[ERROR] Login handler error:", error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default loginHandler;
