import React from "react";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import styles from "../HomePage/HomePage.module.css";
import Cards from "../Cards/Cards";
import {  useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";

const HomePage = () => {
  
  const state = useSelector((state) => state);
  const cookies = new Cookies();
  

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  let currentsDogs = state.allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const data = window.localStorage.getItem("currentDogs");

    setCurrentPage(JSON.parse(data)); // seteo la ultima pagina cuando se monte el compononte para no perder
  }, []); // la pagina actual al pasar de componentes en componentes

  useEffect(() => {
    window.localStorage.setItem("currentDogs", JSON.stringify(currentPage)); //guardo mi pagina actual
  }, [currentPage]);

 

  return (
    <div className={styles.divHome}>
      <h4 className={styles.welcome}>Welcome {cookies.get("user")}!🐶</h4>
      <div className={styles.divPagination}>
        <h2 className={styles.currentPage}>Page:{currentPage}</h2>
        <Pagination
          allDogs={state.allDogs}
          pagination={pagination}
          dogsPerPage={dogsPerPage}
          currentPage={currentPage}
        />
      </div>

      {currentsDogs && <Cards currentsDogs={currentsDogs} />}
    </div>
  );
};

export default HomePage;





 // useEffect(() => {
  //   if (state.favorites.length) return;
  //   dispatch(getFavorites(coockies.get("user")));
  // }, []); //vacie el array de dependecias porque se me lopeaba el estado favorite creo no me acuerdo cuando paso me olvide de comentar porque lo vacie , creo q habia solucionado eso pero no volvi a probar llenando el array de dependencias si no se vuelve a loopear de todas formas creo que esto lo tenia porque queria agregar una funcionalidad que descarte en card y necesitaba tener el estado de favoritos cargado para poder hacerlo lo comento pero si llegase a tener algun bug descomentare las lineas

  // useEffect(() => {
  //   if (!cookies.get("user")) {
  //     //para q me funcione el logOut al quitarle las cookies le quito el permiso de acceder
  //     navigate("/login"); //a cualquier ruta
  //   }
  // }, [cookies, dispatch, navigate]);
