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
        dog.length === state.allDogsHelper.length
          ? styles.hideResult
          : styles.resultsList
      }
    >
      {dog.map((dog, index) => {
        return <SearchResult setDog={setDog} dog={dog.name} key={index} />;
      })}
    </div>
  );
};

export default SearchResultsList;
