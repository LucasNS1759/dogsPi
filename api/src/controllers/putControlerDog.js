const { Dog, Temperament } = require("../db.js");

const putControlerDog = async (id, Weight, Height, Image,LifeSpan, Temperaments) => {
//   if (Weight || Height || Image) {
//     await Dog.update(
//       {
//         weight: Weight,
//         height: Height,
//         image: Image,
//       },
//       {
//         where: { id },
//       }
//     );
//     let dogModify = await Dog.findByPk(id);
//     return dogModify;
//   }
//   if (Temperaments) {
//     let dogModify = await Dog.findByPk(id);
//     let temps = await Temperament.findAll({ where: { name: Temperaments } });
//     await dogModify.setTemperaments(temps);
//     const result = await Dog.findByPk(dogModify.id, {
//       include: [{ model: Temperament }],
//     });

//     return result;
//   }
  if (Weight && Height && Image && LifeSpan && Temperaments) {
    await Dog.update(
      {
        weight: Weight,
        height: Height,
        image: Image,
        lifeSpan:LifeSpan
      },
      {
        where: { id },
      }
    );
    let dogModify = await Dog.findByPk(id);
    let temps = await Temperament.findAll({ where: { name: Temperaments } });
    await dogModify.setTemperaments(temps);
    const result = await Dog.findByPk(dogModify.id, {
      include: [{ model: Temperament }],
    });

    return result;
  }
};

module.exports = putControlerDog;
