const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
const { infoDogClean } = require("./helpers.js");

const getDogsIdRaza = async (id, searchIn) => {
  let dog;
  if (searchIn === "api") {
    dog = await axios.get("https://api.thedogapi.com/v1/breeds");
    let dogInfo = infoDogClean(dog.data, id);
    return dogInfo;
  }
  dog = await Dog.findByPk(id, {
    include: [{ model: Temperament }],
  });
  return dog;
};

module.exports = getDogsIdRaza;
