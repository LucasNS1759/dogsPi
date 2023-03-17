import React from "react";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../HomePage/HomePage.module.css";
import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getAllTemperaments,getALLdogsOnlyApi,getALLdogsOnlyBdd } from "../../Redux/actions";

const HomePage = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [dog, setDog] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
 

  const handlerLogOut = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("user", { path: "/" });
    console.log(cookies);

    navigate("/login");
  };

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperaments())
    dispatch(getALLdogsOnlyApi())
    dispatch(getALLdogsOnlyBdd())
    
  }, [dispatch]);

  useEffect(() => {
    if (!cookies.get("user")) {
      navigate("/login");
    }
  }, [cookies, navigate]);
  
  
  return (
    <div className={styles.divHome}>
      <NavBar setDog={setDog} dog={dog} handlerLogOut={handlerLogOut} />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
      {state?.allDogs && <Cards />}
    </div>
  );
};

export default HomePage;
