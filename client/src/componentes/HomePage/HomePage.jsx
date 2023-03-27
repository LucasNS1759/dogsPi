import React from "react";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../HomePage/HomePage.module.css";
import Cards from "../Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../Redux/actions";
import Pagination from "../Pagination/Pagination";


const HomePage = () => {
  const coockies = new Cookies();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookies = new Cookies();
  const navigate = useNavigate();

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

    setCurrentPage(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("currentDogs", JSON.stringify(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (state.favorites.length) return;
    dispatch(getFavorites(coockies.get("user")));
  }, []);

  useEffect(() => {
    if (!cookies.get("user")) {
      navigate("/login");
    }
  }, [cookies, dispatch, navigate]);

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

      {/* <div className={styles.divPaginationButton}>
        
        <Pagination
          allDogs={state.allDogs}
          pagination={pagination}
          dogsPerPage={dogsPerPage}
          currentPage={currentPage}
        />
      </div> */}
    </div>
  );
};

export default HomePage;
