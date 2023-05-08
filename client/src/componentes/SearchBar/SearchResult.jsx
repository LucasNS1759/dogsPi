import React from "react";
import styles from "./SearchResult.module.css";
import { useDispatch } from "react-redux";
import { getDogByName,currentPage } from "../../Redux/actions";
import { Link } from "react-router-dom";

//este componente lo unico que hace es renderizar mis resultados de busqueda, osea los nombres de las razas que yo busque y me da la posibilidad de poder buscar cualquier raza que me aparezcca como resultado al hacerle click
const SearchResult = ({ dog, setDog }) => {
  const dispatch = useDispatch();

  const handlerDispatch = () => {
    dispatch(getDogByName(dog));
    dispatch(currentPage(1))
    setDog("");
  };

  return (
    <div className={styles.searchResult} onClick={handlerDispatch}>
    <Link to={"/Home"}>
      {dog}
      </Link>
    </div>
  );
};

export default SearchResult;
