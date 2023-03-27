import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cleanFav, getFavorites } from "../../Redux/actions";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import styles from "./Favorites.module.css";
import axios from "axios";

const Favorites = () => {
  const coockies = new Cookies();
  const state = useSelector((state) => state);
  const disptach = useDispatch();
  useEffect(() => {
    disptach(getFavorites(coockies.get("user")));

    return () => {
      disptach(cleanFav());
    };
  }, []);

  const handlerDeleteFav = (name) => {
    try {
      axios.delete(
        `http://localhost:3001/Favorites?name=${name}&user=${coockies.get(
          "user"
        )}`
      );
      window.alert("dog deleted successfully");
      disptach(getFavorites(coockies.get("user")));
    } catch (error) {
      window.alert(error.message);
    }
  };
  
  const handlerLink = (name) =>{
  return  `https://en.wikipedia.org/wiki/${name}`
  }
  
  

  return (
    <div className={styles.divFav}>
      {state.favorites.length ? (
        state?.favorites?.map((favorite, index) => {
          return (
            <div className={styles.conteinerFav} key={index}>
              <a className={styles.nameFav} href={handlerLink(favorite.name)}  target="_blank" rel="noreferrer">
              {favorite.name}
              </a>
              <button className={styles.btnDelete} onClick={() => handlerDeleteFav(favorite.name)}>
                ❌
              </button>
              <img
                className={styles.imgFav}
                src={favorite?.image}
                alt={favorite?.name}
              />
            </div>
          );
        })
      ) : (
        <img
          className={styles.giftFav}
          src="https://gifdb.com/images/high/dog-chicken-costume-moving-nothing-to-see-here-rbbvwci17mx9bpmr.gif"
          alt="dogGift"
        />
      )}
    </div>
  );
};

export default Favorites;
