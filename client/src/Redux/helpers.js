export const filterTemeperament = (action, allDogs) => {
  let origin = action[0];
  let temperament = action[1];
  let result;

  if (temperament === "All" && origin !== "All") {
    result = allDogs;
  }

  switch (origin) {
    case "All":
      if (temperament === "All") {
        return allDogs;
      }
      result = allDogs.filter((dog) => dog?.temperament?.includes(temperament));
      break;
    case "Api":
      if (temperament === "All") {
        return onlyDogsApi(allDogs);
      }
      result = allDogs.filter((dog) => dog?.temperament?.includes(temperament));
      break;

    case "Created":
      if (temperament === "All") {
        return cleanDogsBdd(allDogs);
      }
      result = cleanDogsBdd(allDogs).filter((dog) =>
        dog?.temperament?.includes(temperament)
      );
      break;

    default:
      if (temperament === "All") return allDogs;
      result = allDogs.filter((dog) => dog?.temperament?.includes(temperament));
  }
  if (!result.length) {
    window.alert(`no results found for ${action}`);

    return cleanDogsBdd(allDogs);
  }

  return result;
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
      height: dog.height,
      weight: dog.weight,
      temperament: dog?.temperaments?.map((dog) => dog?.name).join(),
      lifeSpan: dog.lifeSpan,
      created: dog.created,
    };
  });
  return cleanDogsBdd;
};

export const sortBycase = (allDogs, action) => {
  let origin = action[0];
  let sortBy = action[1];
  let result;

  switch (origin) {
    case "All":
      if (sortBy === "A-Z") {
        result = allDogs.sort((dog1, dog2) => {
          if (dog1.name < dog2.name) {
            return -1;
          } else if (dog1.name > dog2.name) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (sortBy === "Z-A") {
        result = allDogs.sort((dog1, dog2) => {
          if (dog1.name > dog2.name) {
            return -1;
          } else if (dog1.name < dog2.name) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (sortBy === "MAX-WEIGHT") {
        result = allDogs.filter(
          (dog) =>
            isNaN(parseInt(dog.weight.split(",").slice(0, 1).join())) !== true
        );
        return result
          .sort(
            (dog1, dog2) =>
              parseInt(dog1.weight.split(",").slice(0, 1).join()) -
              parseInt(dog2.weight.split(",").slice(0, 1).join())
          )
          .reverse();
      }
      if (sortBy === "MIN-WEIGHT") {
        result = allDogs.filter(
          (dog) =>
            isNaN(parseInt(dog.weight.split(",").slice(0, 1).join())) !== true
        );
        return result.sort(
          (dog1, dog2) =>
            parseInt(dog1.weight.split(",").slice(0, 1).join()) -
            parseInt(dog2.weight.split(",").slice(0, 1).join())
        );
      }
      break;
    case "Api":
      if (sortBy === "A-Z") {
        result = onlyDogsApi(allDogs).sort((dog1, dog2) => {
          if (dog1.name < dog2.name) {
            return -1;
          } else if (dog1.name > dog2.name) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (sortBy === "Z-A") {
        result = onlyDogsApi(allDogs).sort((dog1, dog2) => {
          if (dog1.name > dog2.name) {
            return -1;
          } else if (dog1.name < dog2.name) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (sortBy === "MAX-WEIGHT") {
        result = onlyDogsApi(allDogs).filter(
          (dog) =>
            isNaN(parseInt(dog.weight.split(",").slice(0, 1).join())) !== true
        );
        return result
          .sort(
            (dog1, dog2) =>
              parseInt(dog1.weight.split(",").slice(0, 1).join()) -
              parseInt(dog2.weight.split(",").slice(0, 1).join())
          )
          .reverse();
      }
      if (sortBy === "MIN-WEIGHT") {
        result = onlyDogsApi(allDogs).filter(
          (dog) =>
            isNaN(parseInt(dog.weight.split(",").slice(0, 1).join())) !== true
        );
        return result.sort(
          (dog1, dog2) =>
            parseInt(dog1.weight.split(",").slice(0, 1).join()) -
            parseInt(dog2.weight.split(",").slice(0, 1).join())
        );
      }
      break;
    case "Created":
      if (sortBy === "A-Z") {
        result = cleanDogsBdd(allDogs).sort((dog1, dog2) => {
          if (dog1.name < dog2.name) {
            return -1;
          } else if (dog1.name > dog2.name) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (sortBy === "Z-A") {
        result = cleanDogsBdd(allDogs).sort((dog1, dog2) => {
          if (dog1.name > dog2.name) {
            return -1;
          } else if (dog1.name < dog2.name) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (sortBy === "MAX-WEIGHT") {
        result = cleanDogsBdd(allDogs).filter(
          (dog) =>
            isNaN(parseInt(dog.weight.split(",").slice(0, 1).join())) !== true
        );
        return result
          .sort(
            (dog1, dog2) =>
              parseInt(dog1.weight.split(",").slice(0, 1).join()) -
              parseInt(dog2.weight.split(",").slice(0, 1).join())
          )
          .reverse();
      }
      if (sortBy === "MIN-WEIGHT") {
        result = cleanDogsBdd(allDogs).filter(
          (dog) =>
            isNaN(parseInt(dog.weight.split(",").slice(0, 1).join())) !== true
        );
        return result.sort(
          (dog1, dog2) =>
            parseInt(dog1.weight.split(",").slice(0, 1).join()) -
            parseInt(dog2.weight.split(",").slice(0, 1).join())
        );
      }
      break;

    default:
      if (sortBy === "A-Z") {
        result = allDogs.sort((dog1, dog2) => {
          if (dog1.name < dog2.name) {
            return -1;
          } else if (dog1.name > dog2.name) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (sortBy === "Z-A") {
        result = allDogs.sort((dog1, dog2) => {
          if (dog1.name > dog2.name) {
            return -1;
          } else if (dog1.name < dog2.name) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (sortBy === "MAX-WEIGHT") {
        result = allDogs.filter(
          (dog) =>
            isNaN(parseInt(dog.weight.split(",").slice(0, 1).join())) !== true
        );
        return result
          .sort(
            (dog1, dog2) =>
              parseInt(dog1.weight.split(",").slice(0, 1).join()) -
              parseInt(dog2.weight.split(",").slice(0, 1).join())
          )
          .reverse();
      }
      if (sortBy === "MIN-WEIGHT") {
        result = allDogs.filter(
          (dog) =>
            isNaN(parseInt(dog.weight.split(",").slice(0, 1).join())) !== true
        );
        return result.sort(
          (dog1, dog2) =>
            parseInt(dog1.weight.split(",").slice(0, 1).join()) -
            parseInt(dog2.weight.split(",").slice(0, 1).join())
        );
      }
  }

  return result;
};

// if (action === "A-Z") {
//   result = allDogs.sort((dog1, dog2) => {
//     if (dog1.name < dog2.name) {
//       return -1;
//     } else if (dog1.name > dog2.name) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });
// }
// if (action === "Z-A") {
//   result = allDogs.sort((dog1, dog2) => {
//     if (dog1.name > dog2.name) {
//       return -1;
//     } else if (dog1.name < dog2.name) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });
// }

// if (action === "MAX-WEIGHT") {
//   result = allDogs.filter(
//     (dog) =>
//       isNaN(parseInt(dog.weight.split(",").slice(0, 1).join())) !== true
//   );
//   return result
//     .sort(
//       (dog1, dog2) =>
//         parseInt(dog1.weight.split(",").slice(0, 1).join()) -
//         parseInt(dog2.weight.split(",").slice(0, 1).join())
//     )
//     .reverse();
// }

// if (action === "MIN-WEIGHT") {
//   result = allDogs.filter(
//     (dog) =>
//       isNaN(parseInt(dog.weight.split(",").slice(0, 1).join())) !== true
//   );
//   return result.sort(
//     (dog1, dog2) =>
//       parseInt(dog1.weight.split(",").slice(0, 1).join()) -
//       parseInt(dog2.weight.split(",").slice(0, 1).join())
//   );
// }

// return result;
