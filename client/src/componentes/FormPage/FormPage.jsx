import { useSelector,useDispatch } from "react-redux";
import { useState,useEffect  } from "react";
import axios from "axios";
import styles from "../FormPage/FormPage.module.css";
import { useNavigate } from "react-router-dom";
import { validate } from "./validate";
import { getAllDogs } from "../../Redux/actions";


const FormPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [checkedState, setCheckedState] = useState(
    new Array(state.allTemperaments.legth).fill(false)
  );

  const [dogData, setDogData] = useState({
    image: "",
    name: "",
    height: "",
    weight: "",
    temperament: [],
    lifeSpan: "",
  });
  
  console.log(dogData);

  const [errors, setErrors] = useState({
    image: "",
    name: "",
    height: "",
    weight: "",
    temperament: [],
    lifeSpan: "",
  });

  const [access, setAccess] = useState(false);

  const validateFields = () => {
    if (
      dogData.name &&
      dogData.height &&
      dogData.weight &&
      dogData.temperament &&
      dogData.lifeSpan &&
      dogData.image
    ) {
      setAccess(true);
    }
  };

  const onchangeHandlerDogData = (e) => {
    setDogData({
      ...dogData,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...dogData,
        [e.target.name]: e.target.value,
      })
    );
  
  };

  const handlerCheckedChange = (position, e) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    console.log(updatedCheckedState);
    setCheckedState(updatedCheckedState);
    
    setDogData({
      ...dogData,
      [e.target.name]:  [...new Set([...dogData.temperament.concat(e.target.value)])]
    });
    validateFields()
  };

  const handlerSubmitForm = (e) => {
    e.preventDefault();
   
    if (access === true) {
      try {
        axios.post("http://localhost:3001/dogs", {
          image: dogData.image,
          name: dogData.name,
          height: dogData.height,
          weight: dogData.weight,
          temperament: dogData.temperament,
          lifeSpan: dogData.lifeSpan,
        });
        window.alert("Dog created successfully");
        navigate("/Home");
        dispatch(getAllDogs())
        
      } catch (error) {
        return window.alert(error.message);
      }
    }
   if(access === false) return window.alert("Complete the required fields");
  };
  
  useEffect(()=>{
  return (()=>{
  setAccess(false)
  })
  },[])

  return (
    <div className={styles.divConteinerForm}>
      <h1>create a new dog</h1>

      <form className={styles.Form} onSubmit={(e) => handlerSubmitForm(e)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
          autoComplete="off"
            className={styles.inputText}
            onChange={onchangeHandlerDogData}
            type="text"
            value={dogData.name}
            name="name"
            placeholder="
       enter a name..."
          />
          {errors.name ? <p>{errors.name}</p> : ""}
        </div>

        <div>
          <label htmlFor="height">Height</label>
          <input
          autoComplete="off"
            className={styles.inputText}
            onChange={onchangeHandlerDogData}
            type="text"
            value={dogData.height}
            name="height"
            placeholder="
       enter a height..."
          />
          {errors.height ? <p>{errors.height}</p> : ""}
        </div>

        <div>
          <label htmlFor="weight">Weight</label>
          <input
          autoComplete="off"
            className={styles.inputText}
            onChange={onchangeHandlerDogData}
            type="text"
            value={dogData.weight}
            name="weight"
            placeholder="
       enter a weight..."
          />
          {errors.weight ? <p>{errors.weight}</p> : ""}
        </div>

        <div>
          <label htmlFor="lifeSpan">LifeSpan</label>
          <input
          autoComplete="off"
            className={styles.inputText}
            onChange={onchangeHandlerDogData}
            type="text"
            value={dogData.lifeSpan}
            name="lifeSpan"
            placeholder="
       enter a lifeSpan..."
          />
          {errors.lifeSpan ? <p>{errors.lifeSpan}</p> : ""}
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <input
          autoComplete="off"
            className={styles.inputText}
            onChange={onchangeHandlerDogData}
            type="text"
            value={dogData.image}
            name="image"
            placeholder="
       enter a image..."
          />
          {errors.image? <p>{errors.image}</p> : ""}
        </div>

        <div className={styles.cointeinerTemperaments}>
          <h4>Seleccione los temperamentos</h4>
          <ul className={styles.Contenido}>
            {state?.allTemperaments?.map((temperament, index) => {
              return (
                <div className={styles.divCheckBox} key={index}>
                  <li className={styles.liCheckBox}>
                    <input
                      className={styles.checkBox}
                      type="checkbox"
                      id={index}
                      name="temperament"
                      value={temperament}
                      onChange={(e) => handlerCheckedChange(index, e)}
                      checked={checkedState[index]}
                    />
                    <label htmlFor={temperament}>{temperament}</label>
                  </li>
                </div>
              );
            })}
          </ul>
          {errors.temperament ? <p>{errors.temperament}</p> : ""}
        </div>
        <button className={styles.btnCreate}>Create Dog</button>
      </form>
    </div>
  );
};

export default FormPage;








// const handlerCheckedChange = (position, e) => {
//   const updatedCheckedState = checkedState.map((item, index) =>
//     index === position ? !item : item
//   );
//   console.log(updatedCheckedState);
//   setCheckedState(updatedCheckedState);
//   setDogData({
//     ...dogData,
//     [e.target.name]: [...dogData.temperament.concat(e.target.value)],
//   });
// };