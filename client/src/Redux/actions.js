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
  DELETE_DOG,
  CURRENT_DOG,
} from "./types";

import axios from "axios";

export const getAllDogs = () => {
  return async function (dispatch) {
    try {
      const result = await axios("http://localhost:3001/dogs/name?");
      return dispatch({
        type: GET_ALL_DOGS,
        payload: result.data,
      });
    } catch (error) {
      return window.alert(error.message);
    }
  };
};
export const getALLdogsOnlyApi = () => {
  return {
    type: GET_ALL_DOGS_ONLY_API,
  };
};

export const getALLdogsOnlyBdd = () => {
  return {
    type: GET_ALL_DOGS_ONLY_BDD,
  };
};

export const getDogByName = (name) => {
  return async function (dispatch) {
    try {
      const result = await axios(
        `http://localhost:3001/dogs/name?name=${name}`
      );

      if (!result.data.length) {
        return window.alert(result.data.error);
      }

      if (result.data.length) {
        return dispatch({
          type: GET_DOGS_BY_NAME,
          payload: result.data,
        });
      }
    } catch (error) {
      return window.alert(error.message);
    }
  };
};

export const getDetailIdRaza = (id) => {
  return async function (dispatch) {
    try {
      const result = await axios(`http://localhost:3001/dogs/${id}`);

      let response = result.data.length ? result.data[0] : result.data;
      //retorno asi porque la api me viene en un array con 1 objeto y la bdd el objeto solo
      return dispatch({
        type: DETAIL_ID_RAZA,
        payload: response,
      });
    } catch (error) {
      return window.alert(error.message);
    }
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
  };
};

export const getAllTemperaments = () => {
  return async function (dispatch) {
    try {
      const result = await axios("http://localhost:3001/temperaments");
      return dispatch({
        type: GET_ALL_TEMPERAMENTS,
        payload: result.data,
      });
    } catch (error) {
      window.alert(error.message);
    }
  };
};

export const filterByTemperament = (temperament) => {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload: temperament,
  };
};

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
};

export const filterSort = (order) => {
  return {
    type: FILTER_AZ_ZA_MAX_WEIGHT_MIN_WEIGHT,
    payload: order,
  };
};

export const refresh = () => {
  return async function (dispatch) {
    try {
      const result = await axios("http://localhost:3001/dogs/name?");
      return dispatch({
        type: REFRESH,
        payload: result.data,
      });
    } catch (error) {
      window.alert(error.message);
    }
  };
};

export const getFavorites = (user) => {
  return async function (dispatch) {
    try {
      const result = await axios.get(
        `http://localhost:3001/Favorites?user=${user}`
      );

      return dispatch({
        type: GET_FAVORITES,
        payload: result.data,
      });
    } catch (error) {
      window.alert(error.message);
    }
  };
};

export const cleanFav = () => {
  return {
    type: CLEAN_FAV,
  };
};

export const deleteDog = (id) => {
  return async function (dispatch) {
    try {
      const result = await axios.delete(`http://localhost:3001/dogs/${id}`);
      window.alert(result.data);
      return dispatch({
        type: DELETE_DOG,
      });
      // return window.alert("dog deleted successfully");
    } catch (error) {
      return window.alert(error.message);
    }
  };
};

export const currentPage = (page) => {
  return {
    type: CURRENT_DOG,
    payload:page
  };
};
