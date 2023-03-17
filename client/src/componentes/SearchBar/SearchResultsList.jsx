import React from 'react'
import SearchResult from './SearchResult'
import styles from "./SearchResultsList.module.css"

const SearchResultsList = ({dog}) => {
  return (
    <div className={styles.resultsList }>
    {dog.map((dog,index)=>{
     return <SearchResult dog={dog.name} key={index}/>
    })}
    </div>
  )
}

export default SearchResultsList