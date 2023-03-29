const getAllDogs = require("../controllers/getAllDogs.js");
const getDogByName = require("../controllers/getDogByName.js");
const getDogsIdRaza = require("../controllers/getDogsIdRaza.js");
const postDogs = require("../controllers/postDogs.js");
const putControlerDog = require("../controllers/putControlerDog.js");
const deleteControlerDog = require("../controllers/deleteControlerDog.js")

const getDogsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const result = name ? await getDogByName(name) : await getAllDogs();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDogsIdRazaHandler = async (req, res) => {
  const { id } = req.params;
  const searchIn = isNaN(id) ? "bdd" : "api";
  try {
    const result = await getDogsIdRaza(id, searchIn);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postDogsHandler = async (req, res) => {
  const { id, image, name, height, weight, temperament, lifeSpan } = req.body;

  try {
    if ((id, image, name, height, weight, temperament, lifeSpan)) {
      const result = await postDogs(
        id,
        image,
        name,
        height,
        weight,
        temperament,
        lifeSpan
      );
      res.status(200).json(result);
    } else {
      res.status(400).json({ error: "todos los campos son obligatorios" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putDogsHandler = async (req, res) => {

  const {id, Weight,Height,Image,LifeSpan,Temperaments } = req.body;
  console.log(id,Weight,Height,Image,Temperaments);
  try {
    const result = await putControlerDog(id,Weight,Height,Image,LifeSpan,Temperaments);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDogsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteControlerDog(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDogsHandler,
  getDogsIdRazaHandler,
  postDogsHandler,
  getAllDogs,
  putDogsHandler,
  deleteDogsHandler,
};
