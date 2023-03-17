import React from "react";
import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [inputLogin, setInputLogin] = useState({
    user: "",
    password: "",
  });

  const [inputSingUp, setInputSingUp] = useState({
    user: "",
    password: "",
  });

  const handlerOnchange = (e) => {
    setInputLogin({
      ...inputLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handlerOnchangeSingUp = (e) => {
    setInputSingUp({
      ...inputSingUp,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/user", {
        user: inputSingUp.user,
        password: md5(inputSingUp.password),
      });
    } catch (error) {
      console.log(error.message);
    }
    window.alert("usuario registrado con exito");
  };

  const loging = async () => {
    await axios
      .get(
        `http://localhost:3001/user/authenticator?user=${
          inputLogin.user
        }&&password=${md5(inputLogin.password)}`
      )
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          console.log(response);
          let respuesta = response[0];
          console.log(respuesta);
          cookies.set("id", respuesta.id, { path: "/" });
          cookies.set("user", respuesta.user, { path: "/" });
          cookies.set("password", respuesta.password, { path: "/" });
          window.alert(`Welcome ${respuesta.user}`);
          navigate("/");
        } else {
          window.alert("usuario o contraseña incorrectos");
        }
      });
  };

  useEffect(() => {
    if (cookies.get("user")) {
      navigate("/Home");
    }
  }, [cookies, navigate]);

  return (
    <div className={styles.overlay}>
      <div className={styles.divPadre}>
        <div className={styles.Contenido}>
          <header>
            <h1>Welcome to Mi App </h1>

            <p>loging here using a fake username and password to go to Home</p>
          </header>
          <br />

          <input
            className={styles.input}
            onChange={handlerOnchange}
            type="text"
            name="user"
            value={inputLogin.user}
            placeholder="enter your username..."
          />
          <br />

          <input
            className={styles.input}
            type="password"
            name="password"
            value={inputLogin.password}
            onChange={handlerOnchange}
            placeholder="enter your password..."
          />

          <button onClick={() => loging()} className={styles.login}>
            {" "}
            Log In{" "}
          </button>
        </div>

        <form onSubmit={(e) => handlerSubmit(e)}>
          <div className={styles.Contenido}>
            <header>
              <h3>don't have a user? </h3>

              <p>Create a username and password to access the page</p>
            </header>
            <br />

            <input
              className={styles.input}
              onChange={handlerOnchangeSingUp}
              type="text"
              name="user"
              value={inputSingUp.user}
              placeholder="create a user..."
            />
            <br />

            <input
              className={styles.input}
              type="password"
              name="password"
              value={inputSingUp.password}
              onChange={handlerOnchangeSingUp}
              placeholder="create a password..."
            />

            <button onClick={handlerSubmit}>Sing Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
