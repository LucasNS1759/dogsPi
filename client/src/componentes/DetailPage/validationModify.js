export const validateData = (data) => {
  const regExWeight = /^\d{1,2}-\d{2,3} (kg)$/;
  const regExHeight = /^\d{1,2}-\d{2,3} (cm)$/;
  const regExLifeSpan = /^\d{1,2}-\d{2} (years)$/;
  const regExImage = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i;
  let result;

  if (data.Weight || data.Height || data.LifeSpan || data.Image) {
    if (data.Weight) {
      result = regExWeight.test(data.Weight);
    }
    if (data.Height) {
      result = regExHeight.test(data.Height);
    }
    if (data.LifeSpan) {
      result = regExLifeSpan.test(data.LifeSpan);
    }
    if (data.Image) {
      result = regExImage.test(data.Image);
    }
    return result;
  }
  if (!data.Weight || !data.Height || !data.LifeSpan || !data.Image) {
    return true;
  }
};
