import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/LandingPages.module.scss";

const IndexPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>The Recipe Box</h1>
        <p>All of Your Recipes, All in One Place.</p>
      </div>

      <div className={styles.center}>
        <Image
          src="/images/food.png"
          alt="Food image"
          className={styles.foodImage}
          width={400}
          height={400}
        ></Image>
      </div>

      <div className={styles.right}>
        <div className={styles.buttonsWrapper}>
          <div className={styles.buttonGroup}>
            <p className={styles.label}>New User?</p>
            <Link href="/signup" className={styles.button}>
              Sign Up
            </Link>
          </div>

          <div className={styles.buttonGroup}>
            <p className={styles.label}>Returning?</p>
            <Link href="/login" className={styles.button}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
