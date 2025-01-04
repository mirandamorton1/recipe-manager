import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/LoginSignup.module.scss";
import { FiArrowLeft } from "react-icons/fi";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("An error occurred while signing up");
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <FiArrowLeft size={30} className={styles.backArrow} />
      </Link>
      <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div>
        <p className={styles.link}>
          Already have an account?
          <Link href="/login">
            <p>Login here</p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
