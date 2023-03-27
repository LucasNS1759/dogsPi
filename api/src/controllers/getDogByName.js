// const axios = require("axios")
// const {findNameApi} = require("./helpers")
// const { Dog, Temperament } = require("../db.js");
// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;
const getAllDogs = require("./getAllDogs");

const getDogByName = async (name) => {
  const result = await getAllDogs();

  const searchByName = result.filter((dog) =>
    dog.name.toLowerCase().includes(name.toLowerCase())
  );
  if (searchByName.length === 0) {
   searchByName = { error: "no hay concidencias para su busqueda" };
  }

  return searchByName;
};

module.exports = getDogByName;

