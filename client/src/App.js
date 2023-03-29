import "./App.css";
import Login from "./componentes/Login/Login";
import HomePage from "./componentes/HomePage/HomePage";
import FormPage from "./componentes/FormPage/FormPage";
import DetailPage from "./componentes/DetailPage/DetailPage";
import { Route, Routes, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import LandingPage from "./componentes/LandingPage/LandingPage";
import { useEffect, useState } from "react";
import Error404 from "./componentes/Error404/Error404";
import Favorites from "./componentes/Favorites/Favorites";
import { useDispatch} from "react-redux";
import NavBar from "./componentes/NavBar/NavBar";
import { getAllDogs, getAllTemperaments } from "../src/Redux/actions";
import { useLocation } from "react-router-dom";


function App() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const [dog, setDog] = useState([]);
  

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);
  // array de dependecias vacio para verificar el tema de que me despacha cuando entro y salgo del detail despues de hacer una busqueda con la search si me aparecen comportamientos raros es por esot volver a llenar el array con el dispatch

  useEffect(() => {
    dispatch(getAllTemperaments()); //necesito llenar mi estado de temperamentos para hacer los filtros
  }, [dispatch]);

  useEffect(() => {
    if (cookies.get("user")) { // si no tengo cookies (logOut) me manda al login y no puedo volver a las rutas
      return // hasta q vuelva a cargar cookies y me autorice 
    } else {
      navigate("login");
    }
  }, [cookies, navigate]);

  const handlerLogOut = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("user", { path: "/" });

    navigate("/login");
  };

  return (
    <div className="App">
    
     <div className="divNavBar">
     {location.pathname !== "/login" && location.pathname !== "/" && <NavBar handlerLogOut={handlerLogOut} setDog={setDog} dog={dog} /> }
      
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/CreateDog" element={<FormPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate to={"/404"} />} />
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
