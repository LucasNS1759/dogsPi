const axios = require("axios");
const { Temperament } = require("../db.js");
const { cleanTemperaments } = require("./helpers.js");

const getAllTemperaments = async () => {
  // if ((await Temperament.count()) > 0) {
  //   return 
  // } se me rompe 

  let result = await axios.get("https://api.thedogapi.com/v1/breeds");
  result = await Promise.all(result.data);
  let allTemperaments = cleanTemperaments(result);

  allTemperaments.map(async (temperament) => {
    await Temperament.findOrCreate({ where: { name: temperament } });
  });

  return allTemperaments;
};

module.exports = getAllTemperaments;
