const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
const { cleanArray } = require("./helpers.js");

const getAllDogs = async () => {
  let allDogsBd = await Dog.findAll({
    include: [{ model: Temperament }],
  });

  const dogsApi = await axios.get("https://api.thedogapi.com/v1/breeds");

  const allDogsApi = cleanArray(dogsApi.data);
  if (allDogsBd.length) {
    return [...allDogsBd, ...allDogsApi];
  }
  return [...allDogsApi];
};

module.exports = getAllDogs;
