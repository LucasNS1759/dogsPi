export const filterTemeperament = (allDogs, action) => {
  console.log(action);
  if (action === "All") return allDogs;

  const allDogsForFilter = [
    ...onlyDogsApi(allDogs),
    ...cleanDogsBdd(allDogs),
  ].filter((dog) => dog?.temperament?.includes(action));

  return [...allDogsForFilter];
};

export const onlyDogsApi = (allDogs) =>
  allDogs.filter((dog) => dog.created !== true);

export const cleanDogsBdd = (allDogs) => {
  const dogsDb = allDogs.filter((dog) => dog.created === true);
  const cleanDogsBdd = dogsDb.map((dog) => {
    return {
      id: dog.id,
      image: dog.image,
      name: dog.name,
      heigth: dog.heigth,
      weigth: dog.weigth,
      temperament: dog?.temperaments?.map((dog) => dog?.name).join(),
      lifeSpan: dog.lifeSpan,
      created: dog.created,
    };
  });
  return cleanDogsBdd;
};
