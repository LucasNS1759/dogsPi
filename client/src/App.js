import "./App.css";
import Login from "./componentes/Login/Login";
import HomePage from "./componentes/HomePage/HomePage";
import FormPage from "./componentes/FormPage/FormPage";
import DetailPage from "./componentes/DetailPage/DetailPage";
import { Route, Routes, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import LandingPage from "./componentes/LandingPage/LandingPage";
import { useEffect } from "react";
import Error404 from "./componentes/Error404/Error404";


function App() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  
  
 

  useEffect(() => {
    if (cookies.get("user")) {
      navigate("/");
    } else {
      navigate("login");
    }
  }, []);

  return (
    <div>
    
    
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/CreateDog" element={<FormPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate to={"/404"} />} />
      </Routes>
      
      
      
    </div>
  );
}

export default App;
