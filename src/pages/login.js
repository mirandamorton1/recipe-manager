import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/LoginSignup.module.scss";
import { FiArrowLeft } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [isTwoFactor, setIsTwoFactor] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, twoFAToken: twoFactorCode }),
      });

      const data = await res.json();

      if (res.status === 403) {
        alert(data.error); 
        return;
      }

      if (res.status === 401) {
        if (data.error === "Invalid 2FA code") {
          setError("Invalid 2FA code");
          return;
        }
        if (data.error === "2FA required") {
          setIsTwoFactor(true);
          setError("Please enter your 2FA code");
          return;
        }
      }
      
      if (!res.ok) {
        throw new Error("Login failed");
      }

      const { token, user } = data; 
      console.log("Login response:", { token, user });

      document.cookie = `token=${token}; path=/;`; 

      if (user.role === "ADMIN") {
        router.push("/users"); 
      } else {
        router.push("/dashboard"); 
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <FiArrowLeft size={30} className={styles.backArrow} />
      </Link>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {isTwoFactor && (
          <div className={styles.inputGroup}>
            <label htmlFor="twoFactorCode">2FA Code</label>
            <input
              type="text"
              id="twoFactorCode"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div>
        <p className={styles.link}>
          Don&apos;t have an account?
          <Link href="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
