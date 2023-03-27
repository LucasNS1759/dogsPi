export const validate = (dogData) => {
  let errors = {};
  const regExName =
    /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;
  const regExWeight = /^\d{1,2}-\d{2,3} (kg)$/;
  const regExHeight = /^\d{1,2}-\d{2,3} (cm)$/;
  const regExLifeSpan = /^\d{1,2}-\d{2} (years)$/;
  const regExImage = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i
  
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

  if (!regExHeight.test(dogData.height)) {
    errors.height = "use this format... Example 21-29 cm ⚠️";
  }
  if (regExHeight.test(dogData.height)) {
    errors.height = "✔️";
  }

  if (!regExWeight.test(dogData.weight)) {
    errors.weight = "use this format... Example 10-22 kg ⚠️";
  }
  if (regExWeight.test(dogData.weight)) {
    errors.weight = "✔️";
  }

  if (!regExLifeSpan.test(dogData.lifeSpan)) {
    errors.lifeSpan = "use this format... Example 9-13 years ⚠️";
  }
  if (regExLifeSpan.test(dogData.lifeSpan)) {
    errors.lifeSpan = "✔️";
  }
  
  if (dogData.temperament.length < 0) {
    errors.temperament = "you have to add a temperament minimally⚠️";
  }
  if (dogData.temperament.length) {
    errors.temperament = "✔️";
  }

 
  return errors
};



