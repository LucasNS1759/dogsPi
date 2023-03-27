import {
  GET_ALL_DOGS,
  GET_DOGS_BY_NAME,
  GET_ALL_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENT,
  GET_ALL_DOGS_ONLY_API,
  GET_ALL_DOGS_ONLY_BDD,
  DETAIL_ID_RAZA,
  CLEAN_DETAIL,
  FILTER_BY_ORIGIN,
  FILTER_AZ_ZA_MAX_WEIGHT_MIN_WEIGHT,
  REFRESH,
  GET_FAVORITES,
  CLEAN_FAV,
  DELETE_DOG
  
} from "./types";

import {
  filterTemeperament,
  cleanDogsBdd,
  onlyDogsApi,
  sortBycase,
} from "./helpers";

const initialState = {
  allDogs: [],
  allDogsHelper: [],
  allDogsApi: [],
  allDogsBdd: [],
  allTemperaments: [],
  dogDetail: {},
  favorites: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        allDogsHelper: action.payload,
      };

    case GET_ALL_DOGS_ONLY_API:
      const allDogsApiFilter = state.allDogsHelper;
      const dogsApi = onlyDogsApi(allDogsApiFilter);
      return {
        ...state,
        allDogsApi: dogsApi,
      };

    case GET_ALL_DOGS_ONLY_BDD:
      const allDogsBddFilter = state.allDogsHelper;
      const cleanAllDogsBdd = cleanDogsBdd(allDogsBddFilter);
      return {
        ...state,
        allDogsBdd: cleanAllDogsBdd,
      };

    case GET_DOGS_BY_NAME:
      return {
        ...state,
        allDogs: action.payload,
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        allTemperaments: action.payload,
      };

    case DETAIL_ID_RAZA:
      return {
        ...state,
        dogDetail: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        dogDetail: {},
      };

    case FILTER_BY_TEMPERAMENT:
     
      const temperamentFiltered = filterTemeperament(action.payload,state.allDogsHelper);
      return {
        ...state,
        allDogs: temperamentFiltered,
      };

    case FILTER_BY_ORIGIN:
      let dogsByOrigin;
      if (action.payload === "All") {
        dogsByOrigin = state.allDogsHelper;
      }
      if (action.payload === "Api") {
        dogsByOrigin = state.allDogsApi;
      }
      if (action.payload === "Created") {
        dogsByOrigin = state.allDogsBdd;
      }

      return {
        ...state,
        allDogs: dogsByOrigin,
      };

    case FILTER_AZ_ZA_MAX_WEIGHT_MIN_WEIGHT:
      let dogsForSort = state.allDogsHelper;
      let resultSort = sortBycase(dogsForSort, action.payload);
      return {
        ...state,
        allDogs: resultSort,
      };

    case REFRESH:
      return {
        ...state,
        allDogs: action.payload,
      };
      
      case GET_FAVORITES:
      return{
      ...state,
      favorites: action.payload
      }
      
      case CLEAN_FAV:
      return{
      ...state,
      favorites: []
      }
      
      case DELETE_DOG:
      return{
      ...state,
      }
      
     

    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
