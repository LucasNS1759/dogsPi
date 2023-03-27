import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDetailIdRaza,
  cleanDetail,
  deleteDog,
  getAllDogs,
} from "../../Redux/actions";
import { Link } from "react-router-dom";
import styles from "../DetailPage/DetailPage.module.css";
import { useNavigate } from "react-router-dom";

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let cleanId = id.substring(1, id.length);
  //me venia el id con : antes del nro
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

  return (
    <div className={styles.divDetail}>
      <section className={styles.sectionImg}>
        <img
          className={styles.img}
          src={
            state?.dogDetail?.image
              ? state.dogDetail.image
              : "https://opengameart.org/sites/default/files/wolf_tail.gif"
          }
          alt={state?.dogDetail?.name}
        />
      </section>

      <section className={styles.sectionInfo}>
        {state.dogDetail.created && (
          <button onClick={handlerDelete}>Delete</button>
        )}
        {state.dogDetail.created && <button>modify</button>}
        <div className={styles.name}>
          <h1>Name:</h1>
          <h2>{state?.dogDetail?.name}</h2>
        </div>

        <div className={styles.weightAndHeight}>
          <h1>Weight & Height:</h1>
          <h2>{state?.dogDetail?.height}</h2>
          <h2>{state?.dogDetail?.weight}</h2>
        </div>
        <div className={styles.divTemperaments}>
          <ul>
            <h2>Temperaments:</h2>
            {(state?.dogDetail?.temperaments &&
              state.dogDetail.temperaments.map((temperament, index) => (
                <li className={styles.liTemp} key={index}>
                  {" "}
                  {temperament.name.toString().split(" ").join("")}
                  {/*me venian todos pegados sin comas */}
                </li>
              ))) ||
              (state?.dogDetail?.temperament &&
                state.dogDetail.temperament.split(",").map((temp, index) => (
                  <li className={styles.liTemp} key={index}>
                    {" "}
                    {temp}
                  </li>
                )))}
          </ul>
        </div>
        <div className={styles.divLideSpan}>
          <h2>Life Span:</h2>
          <h3>{state?.dogDetail?.lifeSpan}</h3>
        </div>

        <Link to={"/Home"}>
          <button className={styles.btnBack}>Back</button>
        </Link>
      </section>
    </div>
  );
};

export default DetailPage;
