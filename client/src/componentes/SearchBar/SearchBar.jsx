import React, { useState } from "react";

import styles from "../SearchBar/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getDogByName } from "../../Redux/actions";

const SearchBar = ({ setDog}) => {


  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const onSearch = (value) => {
    fetch(`http://localhost:3001/dogs/name?name=${value}`)
      .then((response) => response.json())
      .then((dogs) => {
        setDog(dogs);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    onSearch(value);
  };
  
 
  


  const dispatchHandler = () => {
    
    try {
      dispatch(getDogByName(input));
    setDog("");
    setInput("");
    window.localStorage.setItem("currentDogs", JSON.stringify(1));
    } catch (error) {
      window.alert(error.message);
    }
    
  };

  return (
    <div className={styles.inputWrapper}>
      <button onClick={dispatchHandler} className={styles.searchIcon}>🔍</button>
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      
    </div>
  );
};

export default SearchBar;
