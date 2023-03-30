import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../FormPage/FormPage.module.css";
import { useNavigate } from "react-router-dom";
import { validate } from "./validate";
import { getAllDogs } from "../../Redux/actions";

//Nota no volver a usar multiples checkBoxes en el futuro...
//REFACTORIZAR LA PARTE DE AGREGAR TEMPERAMENTOS DESPUES DE LA CORRECCION
//ya lo refactorice :)

const FormPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dogData, setDogData] = useState({
    image: "",
    name: "",
    height: "",
    weight: "",
    temperament: [],
    lifeSpan: "",
  });
  


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
      //si los campos pasan las condiciones se seteara el acceso para poder submitear
      dogData?.name &&
      dogData?.height &&
      dogData?.weight &&
      dogData.temperament.length > 0 &&
      dogData?.lifeSpan &&
      dogData?.image
    ) {
      setAccess(true);
    }
    if (
      !dogData.name ||
      !dogData.height ||
      !dogData.weight ||
      dogData.temperament.length < 1 ||
      !dogData.lifeSpan ||
      !dogData.image
    ) {
      setAccess(false);
    }
  };

  const onchangeHandlerDogData = (e) => {
    setDogData({
      //este handler controla la informacion de los inputs
      ...dogData,
      [e.target.name]: e.target.value,
    });
    
    setErrors(
      validate({
        ...dogData,
        [e.target.name]: e.target.value,
      })
    );
    validateFields();
  };

  const handlerOnchangeTemp =  (e) => {
  
    if (dogData.temperament.includes(e.target.value)) return;
    
    setDogData({
      ...dogData,
      [e.target.name]: [...dogData.temperament].concat(e.target.value),
    });
    let temps =  [...dogData.temperament].concat(e.target.value);
    setErrors(
      validate({
        ...dogData,
        [e.target.name]: temps ,
      })
    );
    console.log("value",e.target.value);
  console.log("name",e.target.name);
  console.log(dogData);
    
  };
  
  

  const removeTemperament = (e) => {
    setDogData({
      ...dogData,
      [e.target.name]: [...dogData.temperament].filter(
        (t) => t !== e.target.value
      ),
    });
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
        dispatch(getAllDogs());
      } catch (error) {
        return window.alert(error.message);
      }
    }
    if (access === false) return window.alert("Complete the required fields");
  };

useEffect(()=>{
validateFields()
},[dogData])

  useEffect(() => {
  
    return () => {
      setAccess(false); // seteo el access a false porque me quedaba en true despues de valdar 1 vez y me permitia
    }; // submitear con informacion vacia y creaba perros vacios
  }, []);

  return (
    <div className={styles.divConteinerForm}>
      <h1>Create a new dog</h1>

      <form className={styles.Form} onSubmit={(e) => handlerSubmitForm(e)}>
        <div>
          <label className={styles.labelForm} htmlFor="name">
            Name
          </label>
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
          {errors.name ? <p className={styles.parrafoErr}>{errors.name}</p> : ""}
        </div>

        <div>
          <label className={styles.labelForm} htmlFor="height">
            Height
          </label>
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
          {errors.height ? <p className={styles.parrafoErr}>{errors.height}</p> : ""}
        </div>

        <div>
          <label className={styles.labelForm} htmlFor="weight">
            Weight
          </label>
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
          {errors.weight ? <p className={styles.parrafoErr}>{errors.weight}</p> : ""}
        </div>

        <div>
          <label className={styles.labelForm} htmlFor="lifeSpan">
            LifeSpan
          </label>
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
          {errors.lifeSpan ? <p className={styles.parrafoErr}>{errors.lifeSpan}</p> : ""}
        </div>

        <div>
          <label className={styles.labelForm} htmlFor="image">
            Image
          </label>
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
          {errors.image ? <p className={styles.parrafoErr}>{errors.image}</p> : ""}
        </div>

        <div className={styles.cointeinerTemperaments}>
          <h2 className={styles.h2Select}>select at least 1 temperament</h2>
          <select
          className={styles.selectTemps}
            onChange={(e) => handlerOnchangeTemp(e)}
            name={"temperament"}
          >
            {state?.allTemperaments?.map((temperament, index) => {
              return (
                <option key={index} value={temperament} name={"temperament"}>
                  {temperament}
                </option>
              );
            })}
          </select>
          <h5>temperaments</h5>
          <div>
            <ul>
              {dogData.temperament?.map((temp, index) => (
                <button
                className={styles.btnOptionsTemps}
                  value={temp}
                  key={index}
                  name={"temperament"}
                  onClick={(e) => removeTemperament(e)}
                >
                  {temp}
                </button>
              ))}
            </ul>
          </div>

          {dogData.temperament.length === 0 ? <p className={styles.parrafoErr}>{errors.temperament}</p> : "✔️"}
        </div>
        <button className={styles.btnCreate}>Create Dog</button>
      </form>
    </div>
  );
};

export default FormPage;

/*********************************************************************************************** */

// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "../FormPage/FormPage.module.css";
// import { useNavigate } from "react-router-dom";
// import { validate } from "./validate";
// import { getAllDogs } from "../../Redux/actions";

// //Nota no volver a usar multiples checkBoxes en el futuro...
// //REFACTORIZAR LA PARTE DE AGREGAR TEMPERAMENTOS DESPUES DE LA CORRECCION

// const FormPage = () => {

//   const state = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [checkedState, setCheckedState] = useState(new Array(125).fill(false));
// //use 125 en el useState anterioremente usaba el largo de los temperamentos pero a medida de q la app crecio o q yo cambie algo q no me acuerdo no me funcionaba usar el largo del arreglo para crear 125 posiciones me fuuncionaba la primera vez y ala actualizar el componente se perdia (state.allTemperaments) y por ende perdia la funcionalidad al agregar los temperamentos

//   const [dogData, setDogData] = useState({
//     image: "",
//     name: "",
//     height: "",
//     weight: "",
//     temperament: [],
//     lifeSpan: "",
//   });

//   const [errors, setErrors] = useState({
//     image: "",
//     name: "",
//     height: "",
//     weight: "",
//     temperament: [],
//     lifeSpan: "",
//   });

//   const [access, setAccess] = useState(false);

//   const validateFields = () => {
//     if ( //si los campos pasan las condiciones se seteara el acceso para poder submitear
//       dogData?.name &&
//       dogData?.height &&
//       dogData?.weight &&
//       dogData?.temperament.length >1 &&
//       dogData?.lifeSpan &&
//       dogData?.image
//     ) {
//       setAccess(true);
//     }
//     if (
//       !dogData.name ||
//       !dogData.height ||
//       !dogData.weight ||
//       dogData.temperament.length < 2||
//       !dogData.lifeSpan ||
//       !dogData.image
//     ) {
//       setAccess(false);
//     }
//   };

//   const onchangeHandlerDogData = (e) => {
//     setDogData({ //este handler controla la informacion de los inputs
//       ...dogData,
//       [e.target.name]: e.target.value,
//     });
//     setErrors(
//       validate({
//         ...dogData,
//         [e.target.name]: e.target.value,
//       })
//     );
//     validateFields(dogData);
//   };

// //busco q la pocion del arreglo de false coincida con la pocicion de los temperamentos renderizados si coinciden y esta en false pasa a true y vicebersa para poder tener controlado los temperamentos
//   const handlerCheckedChange = (position, e) => {
//     const updatedCheckedState = checkedState.map((item, index) =>
//       index === position ? !item : item
//     );
//     setCheckedState(updatedCheckedState); //actualizo el array de false con las posiciones en true
//     if (dogData.temperament.includes(e.target.value)) {
//       setDogData({ //condicional para que si vuelvo a marcar una opcion checkeada me lo quite del estado donde
//         ...dogData, // guardo los temperamentos
//         [e.target.name]: [...dogData?.temperament].filter(
//           (t) => t !== e.target.value
//         ),
//       });
//       setErrors(
//         validate({ //vuelvo a validar pero con el estado actualizado(el teperamento q elimine)
//           ...dogData,
//           [e.target.name]: [...dogData?.temperament].filter(
//             (t) => t !== e.target.value
//           ),
//         })
//       );
//       validateFields(dogData); // para q me vuelva a validar los campos despues de la logica

//       return;
//     }

//     setDogData({
//       ...dogData,
//       [e.target.name]: [...dogData.temperament.concat(e.target.value)],
//     });
//     setErrors(
//       validate({
//         ...dogData,
//         [e.target.name]: e.target.value,
//       })
//     );
//     validateFields(dogData);
//   };

//   // console.log(errors.temperament);
//   // console.log(dogData.temperament);
//   // console.log(access);

//   const handlerSubmitForm = (e) => {
//     e.preventDefault();

//     if (access === true) {
//       try {
//         axios.post("http://localhost:3001/dogs", {
//           image: dogData.image,
//           name: dogData.name,
//           height: dogData.height,
//           weight: dogData.weight,
//           temperament: dogData.temperament,
//           lifeSpan: dogData.lifeSpan,
//         });
//         window.alert("Dog created successfully");
//         navigate("/Home");
//         dispatch(getAllDogs());
//       } catch (error) {
//         return window.alert(error.message);
//       }
//     }
//     if (access === false) return window.alert("Complete the required fields");
//   };

//   useEffect(() => {
//     return () => {
//       setAccess(false); // seteo el access a false porque me quedaba en true despues de valdar 1 vez y me permitia
//     }; // submitear con informacion vacia y creaba perros vacios
//   }, []);

//   return (
//     <div className={styles.divConteinerForm}>

//       <h1>create a new dog</h1>

//       <form className={styles.Form} onSubmit={(e) => handlerSubmitForm(e)}>
//         <div>
//           <label className={styles.labelForm} htmlFor="name">Name</label>
//           <input
//             autoComplete="off"
//             className={styles.inputText}
//             onChange={onchangeHandlerDogData}
//             type="text"
//             value={dogData.name}
//             name="name"
//             placeholder="
//        enter a name..."
//           />
//           {errors.name ? <p>{errors.name}</p> : ""}
//         </div>

//         <div>
//           <label className={styles.labelForm} htmlFor="height">Height</label>
//           <input
//             autoComplete="off"
//             className={styles.inputText}
//             onChange={onchangeHandlerDogData}
//             type="text"
//             value={dogData.height}
//             name="height"
//             placeholder="
//        enter a height..."
//           />
//           {errors.height ? <p>{errors.height}</p> : ""}
//         </div>

//         <div>
//           <label className={styles.labelForm} htmlFor="weight">Weight</label>
//           <input
//             autoComplete="off"
//             className={styles.inputText}
//             onChange={onchangeHandlerDogData}
//             type="text"
//             value={dogData.weight}
//             name="weight"
//             placeholder="
//        enter a weight..."
//           />
//           {errors.weight ? <p>{errors.weight}</p> : ""}
//         </div>

//         <div>
//           <label className={styles.labelForm} htmlFor="lifeSpan">LifeSpan</label>
//           <input
//             autoComplete="off"
//             className={styles.inputText}
//             onChange={onchangeHandlerDogData}
//             type="text"
//             value={dogData.lifeSpan}
//             name="lifeSpan"
//             placeholder="
//        enter a lifeSpan..."
//           />
//           {errors.lifeSpan ? <p>{errors.lifeSpan}</p> : ""}
//         </div>

//         <div>
//           <label className={styles.labelForm} htmlFor="image">Image</label>
//           <input
//             autoComplete="off"
//             className={styles.inputText}
//             onChange={onchangeHandlerDogData}
//             type="text"
//             value={dogData.image}
//             name="image"
//             placeholder="
//        enter a image..."
//           />
//           {errors.image ? <p>{errors.image}</p> : ""}
//         </div>

//         <div className={styles.cointeinerTemperaments}>
//           <h4>select at least 3 temperaments</h4>
//           <ul className={styles.Contenido}>
//             {state?.allTemperaments?.map((temperament, index) => {
//               return (
//                 <div className={styles.divCheckBox} key={index}>
//                   <li className={styles.liCheckBox}>
//                     <input
//                       className={styles.inputCheckBox}
//                       type="checkbox"
//                       id={index}
//                       name="temperament"
//                       value={temperament}
//                       onChange={(e) => handlerCheckedChange(index, e)}
//                       checked={checkedState[index]}
//                     />
//                     <label htmlFor={temperament}>{temperament}</label>
//                   </li>
//                 </div>
//               );
//             })}
//           </ul>
//           {errors.temperament ? <p>{errors.temperament}</p> : ""}
//         </div>
//         <button className={styles.btnCreate}>Create Dog</button>
//       </form>
//     </div>
//   );
// };

// export default FormPage;
