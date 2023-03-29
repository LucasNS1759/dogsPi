import React from "react";
import styles from "../Card/Card.module.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";



const Card = (props) => {
  const cookies = new Cookies(); // necesito las cookies para poder mostrar los favoritos
// ya que los favoritos estan relacionados con los usuarios y depende del usuario tendra distintos favoritos
 

  const handlerFav = () => {
    try {
      axios.post("http://localhost:3001/Favorites", {
        image: props.image,
        name: props.name,
        user: cookies.get("user"),
      });
    } catch (error) {
      window.alert(error.message);
    }
  };

  let tempBdd; 
  if (typeof props?.temperament === "object") {
    tempBdd = props?.temperament.map((temp) => temp.name + " ");
  }

  return (
    <div className={styles.divConteiner}>
      <div className={styles.divBtn}>
        <button onClick={handlerFav} className={styles.btnfav}>
          ❤️
        </button>
      </div>

      <div key={props.id} className={styles.item}>
        <Link to={`/detail/:${props.id}`}>
          <img className={styles.img} src={props?.image} alt="" />
        </Link>

        <p className={styles.title}>{props?.name}</p>

        <div className={styles.description}>
        <h4>Temperaments</h4>
          {(tempBdd && [...tempBdd]) ||
            (props.temperament && props.temperament) + " " }
            <br />
            <h5>Weight</h5>
            {props?.weight}
        </div>
      </div>
    </div>
  );
};

export default Card;

