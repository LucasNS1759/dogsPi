import React from "react";
import { Link } from "react-router-dom";
import styles from "../LandingPage/LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.divLanding}>
      <section className={styles.divImg}>
        <img src="/img/rabito_blanquita.jpg" alt="" />
      </section>
      <section className={styles.description}>
        <h1 className={styles.h1}>Do you like Dogs? 🐕</h1>
        <p >
          Find a large number of different breeds, discover details about your
          favorite dogs. Did you find a puppy that you like? Add it to your
          Favorites! Can't find your ideal dog? No problem Create it yourself!
          And more...
        </p>

        <h4 className={styles.h4}>Go Home</h4>
        <Link to={"Home"}>
          <button className={styles.imgHueso}>🦴</button>
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
