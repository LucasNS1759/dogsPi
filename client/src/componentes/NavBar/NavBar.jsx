import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import styles from "../NavBar/NavBar.module.css"
import SearchResultsList from '../SearchBar/SearchResultsList'
import Filter from "../Filter/Filter"


const NavBar = ({setDog,dog,handlerLogOut}) => {
  return (
    <div className={styles.Nav}>
    
    <SearchBar setDog={setDog}  />
   
    
    {dog && dog.length > 0 && <SearchResultsList dog={dog} />}
   
   <Filter/>
   <div className={styles.logOut} >
   <button  onClick={() => handlerLogOut()}>Log Out</button>
   </div>
   
    </div>
  )
}

export default NavBar