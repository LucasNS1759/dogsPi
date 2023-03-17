import React from "react";
import styles from "../Card/Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  let tempBdd;
  if (typeof props?.temperament === "object") {
    tempBdd = props?.temperament.map((temp) => temp.name).join();
  }
  

  return (
    <div  className={styles.divCard}>
      <h1>{props?.name}</h1>
      <Link to={`/detail/:${props.id}`}>
      <img src={props?.image} alt="" />
      </Link>
      <h2>{props?.weight}</h2>
      <p>{(tempBdd && tempBdd) || (props.temperament && props.temperament)}</p>
    </div>
  );
};

export default Card;
