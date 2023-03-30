import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getDetailIdRaza,
  cleanDetail,
  deleteDog,
  getAllDogs,
} from "../../Redux/actions";
import { Link } from "react-router-dom";
import styles from "../DetailPage/DetailPage.module.css";
import { useNavigate } from "react-router-dom";
import { validateData } from "../DetailPage/validationModify.js";

const DetailPage = () => {

 const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let cleanId = id.substring(1, id.length);
  //me venia el id con : antes del nro
  
  const [data, setData] = useState({
    Height: "",
    Weight: "",
    Image: "",
    LifeSpan: "",
  });

  const [temp, setTemp] = useState({
    Temperaments: [],
  });

  useEffect(() => {
    try {
      dispatch(getDetailIdRaza(cleanId));
    } catch (error) {
      return window.alert(error.message);
    }
    return () => {
      dispatch(cleanDetail());
    };
  }, [cleanId, dispatch]);


  const handlerDelete = () => {
    try {
      dispatch(deleteDog(cleanId));
      navigate("/Home");
      dispatch(getAllDogs());
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handlerOnchangeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handlerOnchangeTemp = (e) => {
    if (temp.Temperaments.includes(e.target.value)) {
      return;
    }
    setTemp({
      ...temp,
      [e.target.name]: [...temp.Temperaments].concat(e.target.value),
    });
  };
  
  const removeTemp = (e) =>{
  setTemp({
  ...temp,
  [e.target.name]: [...temp.Temperaments].filter(
    (t) => t !== e.target.value)
  })
  }

  const handlerSubmit = async (e) => { // funcion async necesito esperar a la respuesta para seguir la logica
    e.preventDefault(); //nose si tendria q haber hecho esto desde una action y setear el detail directamente
    if ( // por falta de tiempo no lo refactorice aun asi es 100% funcional
      data.Height || //si tengo algo permito submitear
      data.Image || // si no tengo nada no submitea nada
      data.Weight || // y aviso con un mensaje
      data.LifeSpan ||
      temp.Temperaments.length
    ) {
      if (validateData(data) === true) { // si pasa alguna validacion  hace el try catch
        try { // si solo se pasa 1 solo dato por default se enviara la informacion actual para no perderla
          let response = await axios.put("http://localhost:3001/dogs", {
            id: cleanId,
            Height: data.Height ? data.Height : state?.dogDetail?.height,
            Weight: data.Weight ? data.Weight : state?.dogDetail?.weight,
            Image: data.Image ? data.Image : state?.dogDetail?.image,
            LifeSpan: data.LifeSpan
              ? data.LifeSpan
              : state?.dogDetail?.lifeSpan,
            Temperaments: temp.Temperaments.length
              ? temp?.Temperaments
              : state?.dogDetail?.temperaments?.map((t) => t.name),
          });
          if (response.data) { // si tengo algo en data respondo
            window.alert("dog modify success");
            dispatch(getAllDogs());
            navigate("/Home");
          }
        } catch (error) {
          return window.alert(error.message);
        }
      } else { // si no pasa la validacion aviso que use el mismo formato que usaron para crear el perro
        return window.alert("use the same formate to created dog");
      }
    } else { //si no pasa ninguna de las anteriores quiere decir q los campos estan vacios retorno con un mensaje
      return window.alert("you must modify something first");
    }
  };

  return (
    <div className={styles.divDetail}>
      {/* renderizados condicionales para que los perros creados tengan el form de put y sus respectivos inputs y botones */}
      <section className={styles.sectionImg}>
        {state.dogDetail.created && (
          <button className={styles.btnDelete} onClick={handlerDelete}>
            Delete
          </button>
        )}
        <img
          className={styles.img}
          src={
            state?.dogDetail?.image
              ? state.dogDetail.image
              : "https://opengameart.org/sites/default/files/wolf_tail.gif"
          }
          alt={state?.dogDetail?.name}
        />
        <Link to={"/Home"}>
          <button className={styles.btnBack}>Back</button>
        </Link>
      </section>

      <section className={styles.sectionInfo}>
        {state.dogDetail.created && <h3 className={styles.Modify}>Modify</h3>}

        <form className={styles.formDetail} onSubmit={(e) => handlerSubmit(e)}>
          {state.dogDetail.created && (
            <ul className={styles.ul}>
              <li className={styles.li}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="modify Height..."
                  name="Height"
                  value={data.Height}
                  onChange={handlerOnchangeData}
                />
              </li>

              <li className={styles.li}>
                <input
                  type="text"
                  placeholder="modify Weight..."
                  name="Weight"
                  value={data.Weight}
                  onChange={handlerOnchangeData}
                />
              </li>

              <li className={styles.li}>
                <input
                  type="text"
                  placeholder="modify Image..."
                  name="Image"
                  value={data.Image}
                  onChange={handlerOnchangeData}
                />
              </li>

              <li className={styles.li}>
                <input
                  type="text"
                  placeholder="modify LifeSpan..."
                  name="LifeSpan"
                  value={data.LifeSpan}
                  onChange={handlerOnchangeData}
                />
              </li>
            </ul>
          )}

          {state.dogDetail.created && (
            <select
              className={styles.optionTemperaments}
              onChange={(e) => handlerOnchangeTemp(e)}
              name={"Temperaments"}
            >
              {state?.allTemperaments?.map((temperament) => {
                return (
                  <option
                    className={styles.optionTemperaments}
                    key={temperament}
                    name={"Temperaments"}
                    value={temperament}
                  >
                    {temperament}
                  </option>
                );
              })}
            </select>
          )}

          {state.dogDetail.created && (
            <button className={styles.btnModify}>modify</button>
          )}
          
          <div className={styles.tempMod}>
          {temp.Temperaments.length?<h4>click to remove</h4>:""}
            {temp?.Temperaments.map((t, index) => (
             <button
             className={styles.btnDeleteTemp}
             value={t}
             key={index}
             name="Temperaments"
             onClick={(e)=>removeTemp(e)}
             >
             {t}
             </button>
            ))}
          </div>
        </form>

        <div className={styles.conteinerInfo}>
          <h1 className={styles.h1}>Breed:</h1>
          <h2 className={styles.h2}>{state?.dogDetail?.name}</h2>

          <h1 className={styles.h1}>Height & Weight:</h1>
          <h2 className={styles.h2}>{state?.dogDetail?.height}</h2>
          <h2 className={styles.h2}>{state?.dogDetail?.weight}</h2>

          <h1 className={styles.h1}>Temperaments:</h1>
          {(state?.dogDetail?.temperaments &&
            state.dogDetail.temperaments.map((temperament, index) => (
              <ul key={index} >
                <li  className={styles.liTemp} >
                  {temperament.name.toString().split(" ").join("")}
                  {/*me venian todos pegados sin comas */}
                </li>
              </ul>
            ))) ||
            (state?.dogDetail?.temperament &&
              state.dogDetail.temperament.split(",").map((temp, index) => (
                <ul className={styles.ulTemp} key={index}>
                  <li className={styles.liTemp} >
                    {temp}
                  </li>
                </ul>
              )))}

          <h1 className={styles.h1}>Life Span:</h1>
          <h2 className={styles.h2}>{state?.dogDetail?.lifeSpan}</h2>
        </div>
      </section>
    </div>
  );
};

export default DetailPage;
