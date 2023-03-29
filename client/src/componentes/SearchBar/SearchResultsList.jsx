import React from "react";
import SearchResult from "./SearchResult";
import styles from "./SearchResultsList.module.css";
import { useSelector } from "react-redux";

const SearchResultsList = ({ dog,setDog }) => {
  const state = useSelector((state) => state);
  console.log(dog);
  return (
    <div
      className={ 
        dog.length === state.allDogsHelper.length //este renderizado es porque si hago una busqueda y despues borro el
          ? styles.hideResult //input mi onchange en el coponente search cuando esta sin input me carga todos los perros
          : styles.resultsList // en dogs seguramente es porque en mi ruta back mi ruta getAllDogs es
      } // dogs/name? y cuando se borra la query (dogs/name?name=${dog}) en el onchange se activa la ruta dogs/name? entonces tengo q si mi estado es igual al largo de mi estado global ocultarlo porque sino queda la lista de resultados en blanco seria mas facil si mi rutas de backs fueran separadas pero bueno ya esta armado d esta forma
    >  
      {dog.map((dog, index) => {
        return <SearchResult setDog={setDog} dog={dog.name} key={index} />; //aca muestro el texto en la lista
      })}
    </div>
  );
};

export default SearchResultsList;
