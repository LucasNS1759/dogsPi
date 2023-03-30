import React, { useState } from "react";
import styles from "../SearchBar/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getDogByName } from "../../Redux/actions";
import { Link } from "react-router-dom";

const SearchBar = ({ setDog}) => {


  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const onSearch = (value) => {
    fetch(`http://localhost:3001/dogs/name?name=${value}`)
      .then((response) => response.json())
      .then((dogs) => {
        setDog(dogs); //seteo mi estado con la busqueda actual
      })
      .catch(error=>{
      return window.alert(error.message)
      })
  };

  const handleChange = (value) => {
    setInput(value);
    onSearch(value);//ante cada cambio se activa el onsearch
  };
  
  const dispatchHandler = () => {
    try {
      dispatch(getDogByName(input));
    setDog("");
    setInput("");
    window.localStorage.setItem("currentDogs", JSON.stringify(1));//intente arreglar el bug de la search bar de q si la pagina actual es mayor a la pagina de busqueda no se muestra en la pagina 1 pero no pude todavia
    } catch (error) {
      window.alert(error.message);
    }
    
  };

  return (
    <div className={styles.inputWrapper}>
    <Link to={"/Home"}>
      <button onClick={dispatchHandler} className={styles.searchIcon}>🔍</button>
      </Link>
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      
    </div>
  );
};

export default SearchBar;



