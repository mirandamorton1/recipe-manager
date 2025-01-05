import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/LoginSignup.module.scss";
import { FiArrowLeft } from "react-icons/fi";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Password requirements
     const passwordRequirements = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
     if (!passwordRequirements.test(password)) {
       setError("Password must be at least 8 characters long and contain both letters and numbers.");
       return;
     }
 
     if (password !== confirmPassword) {
       setError("Passwords do not match.");
       return;
     }

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
          <p>At least 8 characters long, contain numbers & letters</p>
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
