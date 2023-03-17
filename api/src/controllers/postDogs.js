const { Dog, Temperament } = require("../db.js");

const postDogs = async (
  id,
  image,
  name,
  height,
  weight,
  temperament,
  lifeSpan
) => {
  let newDog = await Dog.create({ id, image, name, height, weight, lifeSpan });

  let temperamentsDb = await Temperament.findAll({
    where: {
      name: temperament,
    },
  });
  
  
  let addTempDog = await newDog.addTemperaments(temperamentsDb);
  
  

  const aux = await Dog.findByPk(newDog.id, {
    include: [{ model: Temperament }],
  });
//recordatorio los temperamentos desde el front los tengo que maandar en forma de arreglo para que me los acepte y muestre como tieneq que ser 
  return aux;
};

module.exports = postDogs;
