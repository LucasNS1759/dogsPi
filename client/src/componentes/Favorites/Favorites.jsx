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
  
  useEffect(() => { //se menota el coponente y despacho mi action para traer mis favoritos junto a mi usuario para que
    disptach(getFavorites(coockies.get("user"))); //me los busque en la base de datos 

    return () => {
      disptach(cleanFav()); // limpio el estado al salir del componente
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const handlerDeleteFav = (name) => {//al no poder pasarle el id porque los perros favoritos son creados con ids
    try {// distintos de los de la api le paso el nombre para poder indentificarlos y hacer el destroy
      // posiblemente si tengo 2 perros con el mismo nombre se borren los 2 independientemene del id
      //no probe ese caso pero se arreglaria poniendo un unique al model favorite para q no haya 2 iguales
      axios.delete( 
        `http://localhost:3001/Favorites?name=${name}&user=${coockies.get(
          "user"
        )}`
      );
      window.alert("dog deleted successfully");
      disptach(getFavorites(coockies.get("user"))); //despacho al borrar para q se actualice la vista
    } catch (error) {
      window.alert(error.message);
    }
  };
  
  const handlerLink = (name) =>{
  return  `https://en.wikipedia.org/wiki/${name}`//retorno el link aca porque en el href no me dejaba concatenar el name
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
