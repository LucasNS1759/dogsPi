import React from "react";
import styles from "./SearchResult.module.css";
import { useDispatch } from "react-redux";
import { getDogByName } from "../../Redux/actions";
import { Link } from "react-router-dom";

//este componente lo unico que hace es renderizar mis resultados de busqueda, osea los nombres de las razas que yo busque y me da la posibilidad de poder buscar cualquier raza que me aparezcca como resultado al hacerle click
const SearchResult = ({ dog, setDog }) => {
  const disptach = useDispatch();

  const handlerDispatch = () => {
    disptach(getDogByName(dog));
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
