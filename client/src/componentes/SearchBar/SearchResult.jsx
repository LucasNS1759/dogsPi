import React from 'react'
import styles from "./SearchResult.module.css"
import { useDispatch } from 'react-redux'
import { getDogByName } from "../../Redux/actions";

const SearchResult = ({dog}) => {
const disptach = useDispatch()
const handlerDispatch = () =>{
disptach(getDogByName(dog))
}

  return (
    <div className={styles.searchResult}
    onClick={handlerDispatch}
    >
    
    {dog}
    </div>
  )
}

export default SearchResult