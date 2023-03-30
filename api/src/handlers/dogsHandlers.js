const getAllDogs = require("../controllers/getAllDogs.js");
const getDogByName = require("../controllers/getDogByName.js");
const getDogsIdRaza = require("../controllers/getDogsIdRaza.js");
const postDogs = require("../controllers/postDogs.js");
const putControlerDog = require("../controllers/putControlerDog.js");
const deleteControlerDog = require("../controllers/deleteControlerDog.js");

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

const postDogsHandler =  (req, res) => {
  const { id, image, name, height, weight, temperament, lifeSpan } = req.body;

 
    if ((id, image, name, height, weight, temperament, lifeSpan)) {
      
      postDogs(
        id,
        image,
        name,
        height,
        weight,
        temperament,
        lifeSpan
      )
      .then(result =>{
        res.status(200).json(result);
      })
      .catch(error =>{
        res.status(400).json({ error: error.message });
      })
      
    } else {
      res.status(400).json({ error: "todos los campos son obligatorios" }); //este error no se va a mostrar nunca porque en el front esta manejado para que se envie la informacion si  o si sino no se hace la request si falta un campo
    }
    
  
   
  
};

const putDogsHandler = async (req, res) => {
  const { id, Weight, Height, Image, LifeSpan, Temperaments } = req.body;
  console.log(id, Weight, Height, Image, Temperaments);
  try {
    const result = await putControlerDog(
      id,
      Weight,
      Height,
      Image,
      LifeSpan,
      Temperaments
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDogsHandler = (req, res) => {
  const { id } = req.params;

  deleteControlerDog(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

module.exports = {
  getDogsHandler,
  getDogsIdRazaHandler,
  postDogsHandler,
  getAllDogs,
  putDogsHandler,
  deleteDogsHandler,
};
