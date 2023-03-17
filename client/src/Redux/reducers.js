import { GET_ALL_DOGS,GET_DOGS_BY_NAME,GET_ALL_TEMPERAMENTS,FILTER_BY_TEMPERAMENT,GET_ALL_DOGS_ONLY_API,GET_ALL_DOGS_ONLY_BDD,DETAIL_ID_RAZA,CLEAN_DETAIL, } from "./types";

import {filterTemeperament,cleanDogsBdd,onlyDogsApi} from "./helpers"


const initialState = {
  allDogs: [],
  allDogsHelper:[],
  allDogsApi:[],
  allDogsBdd:[],
  allTemperaments:[],
  dogDetail:{}
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_ALL_DOGS:
  return{
  ...state,
  allDogs:action.payload,
  allDogsHelper:action.payload,
  }
  
  case GET_ALL_DOGS_ONLY_API:
  const allDogsApiFilter = state.allDogsHelper
  const dogsApi = onlyDogsApi(allDogsApiFilter)
  return {
  ...state,
  allDogsApi:dogsApi
  }
  
  case GET_ALL_DOGS_ONLY_BDD:
  const allDogsBddFilter =state.allDogsHelper
  const cleanAllDogsBdd = cleanDogsBdd(allDogsBddFilter)
  return {
  ...state,
  allDogsBdd:cleanAllDogsBdd
  }
  
  case GET_DOGS_BY_NAME:
  return{
  ...state,
  allDogs:action.payload,
  }
  case GET_ALL_TEMPERAMENTS:
  return{
  ...state,
  allTemperaments:action.payload,
  }
  
  case DETAIL_ID_RAZA:
  return{
  ...state,
  dogDetail:action.payload,
  }
  
  case CLEAN_DETAIL:
  return{
  ...state,
  dogDetail:{}
  }
  
  case FILTER_BY_TEMPERAMENT:
  const allDogs = state.allDogsHelper
  const temperamentFiltered = filterTemeperament(allDogs,action.payload)
  return{
  
  ...state,
  allDogs:temperamentFiltered
  }
  
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
