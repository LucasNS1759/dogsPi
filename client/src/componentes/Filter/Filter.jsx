import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filterByTemperament } from "../../Redux/actions";

const Filter = () => {
const state = useSelector(((state)=>state))
const dispatch = useDispatch()
// const [temperament,setTemperament] = useState("")

// console.log(temperament);


const handlerTemperamentOnchange = (e) =>{

dispatch(filterByTemperament(e.target.value))
}

  return (
    <div>
      <select>
        <option>All</option>
        <option>Api</option>
        <option>Created</option>
      </select>
      
      <select >
          <option value="A-Z">Ordenar A-Z</option>
          <option value="Z-A">Ordenar Z-A</option>
          <option value="MAX-WEIGTH">MAX-WEIGTH</option>
          <option value="MIN-WEIGTH">MIN-WEIGTH</option>
          
         </select>
         
         
        <select onChange={(e)=>handlerTemperamentOnchange(e)}>
          <option value="All">All</option>
          {state?.allTemperaments?.map((temperament) => {
            return (
              <option  key={temperament} value={temperament}>
                {temperament}
              </option>
            );
          })}
        </select>
      
    </div>
  );
};

export default Filter;
