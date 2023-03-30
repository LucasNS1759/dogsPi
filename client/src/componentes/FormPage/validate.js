export const validate = (dogData) => {
  console.log(dogData);
  let errors = {};
  const regExName =
    /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;
  const regExWeight = /^\d{1,2}-\d{1,3} (kg)$/;
  const regExHeight = /^\d{1,2}-\d{2,3} (cm)$/;
  const regExLifeSpan = /^\d{1,2}-\d{2} (years)$/;
  const regExImage = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i;

  if (!regExImage.test(dogData.image)) {
    errors.image = "URL example http ...(png-jpg-gif-svg-jpeg) ⚠️";
  }

  if (regExImage.test(dogData.image)) {
    errors.image = "✔️";
  }

  if (!regExName.test(dogData.name)) {
    errors.name = "must be a valid name ⚠️";
  }
  if (regExName.test(dogData.name)) {
    errors.name = "✔️";
  }

  if (
    Number(
      dogData.height.split("").join(",").split(",").slice(0, 2).join("")
    ) >
    Number(dogData.height.split("").join(",").split(",").slice(3, 5).join(""))
  ) {
    errors.height = "The minimum height cannot be greater than the maximum height.";
  } else if (!regExHeight.test(dogData.height)) {
    errors.height = "use this format... Example 21-29 cm ⚠️";
  } else if (regExHeight.test(dogData.height)) {
    errors.height = "✔️";
  }
 

  if (
    Number(
      dogData.weight.split("").join(",").split(",").slice(0, 2).join("")
    ) >
    Number(dogData.weight.split("").join(",").split(",").slice(3, 5).join(""))
  ) {
    errors.weight =
      "the minimum weight cannot be greater than the maximum weight";
  } else if (!regExWeight.test(dogData.weight)) {
    errors.weight = "use this format... Example 07-12 kg ⚠️";
  } else if (regExWeight.test(dogData.weight)) {
    errors.weight = "✔️";
  }

  if (
    Number(
      dogData.lifeSpan.split("").join(",").split(",").slice(0, 2).join("")
    ) >
    Number(dogData.lifeSpan.split("").join(",").split(",").slice(3, 5).join(""))
  ) {
    errors.lifeSpan = "the minimum life expectancy cannot be greater than the maximum life expectancy";
  }
  else if (!regExLifeSpan.test(dogData.lifeSpan)) {
    errors.lifeSpan = "use this format... Example 09-13 years ⚠️";
  } else if (regExLifeSpan.test(dogData.lifeSpan)) {
    errors.lifeSpan = "✔️";
  }

  if (dogData.temperament.length === 0) {
    //esta puesto de esta forma porque no me muestra el error cuando
    errors.temperament = ""; // esta vacio sin envargo cuando esta en 0 me muestra lo que se supone deberia ser
  } //mi caso de que es mayor a 0 asi q como me muestra este cuando esta en 0 en front valido por el largo del estado dog para poder mostrar bien el mnesaje
  if (dogData.temperament.length > 0) {
    errors.temperament = "you have to add 1 temperament minimally⚠️";
  }

  return errors;
};
