const { Dog } = require("../db.js");

const deleteControlerDog = async (id) => {
  let dogs = await Dog.findAll();
  let totalDogs = dogs.length; // primero busco el largo actual de perros creados
  
  let result = await Dog.destroy({
    where: { id },
  });
  let dogDelete = await Dog.findAll();
  totalDogs.length === dogDelete.length // comparo los largos y respondo
    ? (result = "ups someThing goes wrong")
    : (result = "dog deleted successfully");// esto lo hago para poder responder en el front si se borro con exito
    return result
};

module.exports = deleteControlerDog;
