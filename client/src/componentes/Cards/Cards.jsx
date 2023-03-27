import React from "react";
import styles from "../Cards/Cards.module.css";
import Card from "../Card/Card";



const Cards = ({currentsDogs}) => {


  return <div className={styles.divCards}>
  {currentsDogs && currentsDogs?.map((dog,index)=>{
 
  return(
  <Card
  
  key={index}
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


