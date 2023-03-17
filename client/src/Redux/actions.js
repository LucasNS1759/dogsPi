import {
  GET_ALL_DOGS,
  GET_DOGS_BY_NAME,
  GET_ALL_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENT,
  GET_ALL_DOGS_ONLY_API,
  GET_ALL_DOGS_ONLY_BDD,
  DETAIL_ID_RAZA,
  CLEAN_DETAIL,
} from "./types";

import axios from "axios";

export const getAllDogs = () => {
  return async function (dispatch) {
    const result = await axios("http://localhost:3001/dogs/name?");
    return dispatch({
      type: GET_ALL_DOGS,
      payload: result.data,
    });
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
      if (result.data.length === 0) {
        return new Error(`the dog with the name ${name} does not exist`);
      }
      return dispatch({
        type: GET_DOGS_BY_NAME,
        payload: result.data,
      });
    } catch (error) {
      window.alert(error.message);
    }
  };
};

export const getDetailIdRaza = (id) => {
  return async function (dispatch) {
    try {
      console.log(id);
      const result = await axios(`http://localhost:3001/dogs/${id}`);
      console.log(result.data);

      return dispatch({
        type: DETAIL_ID_RAZA,
        payload: result.data[0],
      });
    } catch (error) {
      return error;
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
