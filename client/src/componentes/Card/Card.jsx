import React from "react";
import styles from "../Card/Card.module.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const Card = (props) => {
  const cookies = new Cookies();
  const [fav, setFav] = useState(false);
  const state = useSelector((state) => state);

  const handlerFav = () => {
    axios.post("http://localhost:3001/Favorites", {
      image: props.image,
      name: props.name,
      user: cookies.get("user"),
    });
    
    for (let i = 0; i <= state.favorites.length; i++) {
      if (i.name === props.name) {
        setFav(true);
      } else {
        setFav(false);
      }
    }
  };

  let tempBdd;
  if (typeof props?.temperament === "object") {
    tempBdd = props?.temperament.map((temp) => temp.name + "");
  }

  return (
    <div className={styles.divConteiner}>
      <div className={styles.divBtn}>
        {fav === true ? (
          <button onClick={handlerFav} className={styles.btnfav}>
            ❤️
          </button>
        ) : (
          <button onClick={handlerFav} className={styles.btnfav}>
            🤍
          </button>
        )}
      </div>
      <div key={props.id} className={styles.item}>
        <Link to={`/detail/:${props.id}`}>
          <img className={styles.img} src={props?.image} alt="" />
        </Link>

        <p className={styles.title}>{props?.name}</p>

        <p className={styles.description}>
          {(tempBdd && tempBdd + " " + props?.weight) ||
            (props.temperament && props.temperament) + " " + props?.weight}
        </p>
      </div>
    </div>
  );
};

export default Card;

/*



 return (
    <div key={props.id} className={styles.divCard}>
    
      <div className={styles.divName}>
        <button onClick={handlerFav} className={styles.btnfav}>❤️</button>
        <h1 className={styles.name}>{props?.name}</h1>
      </div>

      <Link to={`/detail/:${props.id}`}>
        <img src={props?.image} alt="" />
      </Link>
      <div className={styles.weight}>
        <h2>{props?.weight}</h2>
      </div>

      <div className={styles.divTemperaments}>
        <span className={styles.temperamentos}>
          {(tempBdd && tempBdd) || (props.temperament && props.temperament)}
        </span>
      </div>
    </div>
  );



*/
