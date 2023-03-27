import React from "react";
import styles from "../Error404/Error404.module.css";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <>
      <h1 className={styles.title}>Ups nothing here...</h1>
      <h2 className={styles.title}>
      Back<Link to={"/Home"}> Home</Link>?{" "}
      </h2>
      <div className={styles.divError}>
        <img className={styles.dogError} src="/img/dogFine.jpg" alt="dog404" />
      </div>
    </>
  );
};

export default Error404;
