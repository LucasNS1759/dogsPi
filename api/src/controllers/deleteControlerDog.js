const { Dog } = require("../db.js");

const deleteControlerDog = async (id) => {
  let dogs = await Dog.findAll();
  let totalDogs = dogs.length;
  let result = await Dog.destroy({
    where: { id },
  });
  let dogDelete = await Dog.findAll();
  totalDogs.length === dogDelete.length
    ? (result = "ups someThing goes wrong")
    : (result = "dog deleted successfully");
    return result
};

module.exports = deleteControlerDog;
