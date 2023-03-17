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
    return { error: "no hay concidencias para su busqueda" };
  }

  return searchByName;
};

module.exports = getDogByName;
//hacer este codigo era as facil pero calculo que me van a pedir que para hacer esta ruta use el end point que nos indican en el readme de esta forma no utilizo ningun end point creo que es mejor y mas facil pero bueno
// const result = await getAllDogs();

// const searchByName = result.filter((dog) =>
//   dog.name.toLowerCase().includes(name.toLowerCase())
// );
// if(searchByName.length === 0){
// return {error:"no hay concidencias para su busqueda"}
// }

// return searchByName;

// const resultDb = await Dog.findAll({
//   where: {
//     name: { [Op.substring]: name },
//   },
//   include: [{ model: Temperament }],
// });

// const dogsApi = await axios.get("https://api.thedogapi.com/v1/breeds")

// const resultApi = findNameApi(dogsApi.data,name)

// if(resultApi.length === 0 && resultDb.length === 0){
// return `no existe el perro con el nombre ${name}`
// }

// return [...resultDb,...resultApi]
