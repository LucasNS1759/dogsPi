import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  filterByOrigin,
  filterByTemperament,
  filterSort,
  getALLdogsOnlyApi,
  getALLdogsOnlyBdd,
  currentPage
} from "../../Redux/actions";
import styles from "../Filter/Filter.module.css";

const Filter = () => {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  
  const [origin, setOrigin] = useState("");

  const handlerOriginOnchange = (e) => {
    setOrigin(e.target.value);
    if (e.target.value === "Created" && state.allDogsBdd.length === 0) {
      return window.alert("no dogs created");//por si no tengos perros creados q no se rompa
    } else {
      state.allDogsBdd.length && dispatch(filterByOrigin(e.target.value)); 
    }
  };
  
  const handlerSortChange = (e) => {//envio en array el origen de la busqueda y el valor en reducer desestrucuro
    let sortIn = [origin, e.target.value]; //y uso la informacion para hacer el filtrado q corresponde
    dispatch(filterSort(sortIn));
  };
  
  const handlerTemperamentOnchange = (e) => {
    let findTempIn = [origin, e.target.value];
    dispatch(filterByTemperament(findTempIn));
    dispatch(currentPage(1))
  };

  const handlerDispatch = () => {
    if (state.allDogsApi.length && state.allDogsBdd.length) return; //si tengo los estados no hago nada
    dispatch(getALLdogsOnlyApi()); //sino los vuelvo a pedir
    dispatch(getALLdogsOnlyBdd()); //en ocaciones pierdo mis estados auxiliares al pasar entre componentes la verdad no me puse a analisar el motivo pero calculo que debe ser causa de un useEfect en mi componente app o home este handler es para que no pierda la funcionalidad las opciones de filtrado cuando se pierdan los estados , lo arreglare al codigo en gral en un futuro
  }
  return (
    <div className={styles.conteinerFilters}>
    
      <div className={styles.box}>
      
        <select
          onClick={handlerDispatch}
          className={styles.select}
          onChange={(e) => handlerOriginOnchange(e)}
        >
          <option value="All">All</option>
          <option value="Api">Api</option>
          <option value="Created">Created</option>
        </select>

        <select
          className={styles.select}
          onChange={(e) => handlerSortChange(e)}
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="MAX-WEIGHT">MAX-WEIGHT</option>
          <option value="MIN-WEIGHT">MIN-WEIGHT</option>
        </select>

        <select
          className={styles.select}
          onChange={(e) => handlerTemperamentOnchange(e)}
        >
          <option value="All">All</option>
          {state?.allTemperaments?.map((temperament) => {
            return (
              <option key={temperament} value={temperament}>
                {temperament}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Filter;
