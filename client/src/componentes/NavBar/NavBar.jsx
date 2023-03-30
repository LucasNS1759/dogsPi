import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import styles from "../NavBar/NavBar.module.css";
import SearchResultsList from "../SearchBar/SearchResultsList";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refresh } from "../../Redux/actions";

const NavBar = ({ setDog, dog, handlerLogOut }) => {

  const dispatch = useDispatch();
  
  const handlerRefresh = () => {
    try {
      dispatch(refresh());
    } catch (error) {
      return window.alert(error.message);
    }
  };
  
  return (
    <nav className={styles.Nav}>
      <div className={styles.divSearch}>
        <SearchBar setDog={setDog} /> 
        {dog && dog.length > 0 && (
          <SearchResultsList setDog={setDog} dog={dog} /> // si tengo resultado en dog renderizo mi listado de busqueda
        )}
      </div>

      <div className={styles.divFilter}>
        <Filter />
      </div>

      <Link to={"/Home"}>
        <div className={styles.divRefresh}>
          <button onClick={handlerRefresh} className={styles.btnRefresh}>
            Refresh 🔄
          </button>
        </div>
      </Link>

      <Link to={"/Home"}>
        <div className={styles.divBtnHome}>
          <button className={styles.btnHome}>Home🏠</button>
        </div>
      </Link>

      <Link to={"/Favorites"}>
        <div className={styles.divBtnFav}>
          <button className={styles.btnFav}>Favorites⭐</button>
        </div>
      </Link>

      <Link to="/CreateDog">
        <div className={styles.divBtnCreated}>
          <button className={styles.btnCreate}>Create Dog🐶</button>
        </div>
      </Link>

      <div className={styles.logOut}>
        <Link to="/login">
          <button className={styles.btnLogOut} onClick={() => handlerLogOut()}>
            LogOut↩️
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
