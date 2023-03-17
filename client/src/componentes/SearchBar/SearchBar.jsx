import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"
import styles from "../SearchBar/SearchBar.module.css";
import { useDispatch,useSelector } from "react-redux";
import { getDogByName } from "../../Redux/actions";

const SearchBar = ({ setDog }) => {
const state = useSelector((state)=>state)
const dispatch = useDispatch()
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
    dispatch(getDogByName(input))
  }

  return (
    <div className={styles.inputWrapper}>
    <FaSearch onClick={dispatchHandler} className={styles.searchIcon}/>
      <input
      placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
