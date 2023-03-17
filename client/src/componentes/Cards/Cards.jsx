import React from "react";
import styles from "../Cards/Cards.module.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";


const Cards = () => {
const state = useSelector((state)=>state)

  return <div className={styles.divCards}>
  {state?.allDogs && state?.allDogs?.map((dog,index)=>{
 
  return(
  <Card
  
  key={dog.index}
  id={dog.id}
  image={dog.image && dog.image}
  name={dog.name && dog.name}
  temperament={dog.temperaments?dog.temperaments:dog.temperament}
  weight={dog.weight && dog.weight}
  

  />
  )
  })}
  </div>;
};

export default Cards;


