const cleanArray = (arrayDogs) => {
  const clean = arrayDogs.map((dog) => {
    
    return {
      id: dog.id,
      image: dog.image.url,
      name: dog.name,
      height: dog.height.metric + " " + "cm",
      weight: dog.weight.metric + " " + "kg",
      temperament: dog.temperament,
      lifeSpan: dog.life_span,
      created: false,
      
    };
  });
  return clean;
};

//   String.prototype.toNum = function () {
//     return parseFloat(this.split(' ').join('').split(',').join('') || 0);
// }

const cleanTemperaments = (allDogs) => {
  let allTemperaments = allDogs.map((dog) =>
    dog.temperament ? dog.temperament.toString().split(" ") : ""
  );
  //mapeo los temperamentos uso ternario porque hay perros que no tienen temperamentos en la api entonces al querer mapear un perro que no tiene temperamento se me rompia porque ser undefined
  let flat = allTemperaments.flatMap((d) => d);
  //uso un flatMap para poder aplanar el resultado ya que cada iteracion me devolvia un array en formato de 1 solo strings 5 teperamentos cada perro
  let setFlat = new Set(flat.toString().split(" ").join("").split(",").sort());
  //una vez aplanado mi array ahora es un array solo, lo que hago es usar un set para eliminar los temperamentos repetidos, seguido tengo que eliminar las comas de los strings ya que me venian algunos temperamentos con una coma al final del string ej "active," y para eliminarlo parseo mi array a string lo hago array de nuevo para eliminarles todas las comas entre ls strings lo uno y hago array de nuevo pero esta vez separados por 1 coma sola como tiene que quedar y los ordeno alfabeticamente para poder ver mas facil que esten todos bien y ademas me va a facilitar cuando tenga que usar los temperamentos en el front

  let cleanSet = [...setFlat];
  //como use un Set tenia la informacion dentro de un objeo desestructuro para que me quede un un array solo
  cleanSet.shift();
  //eliino pa primera posicion poque en mi primera posicion era de una coma en forma de string ","

  // y retorno ya mi arreglo de temperamentos sin repetidos y sin comas dentro del string

  return cleanSet;
};

const infoDogClean = (dogArray, id) => {
  let dog = dogArray.filter((d) => d.id === parseInt(id));
  return cleanArray(dog);
};

const findNameApi = (dogs,name)=>{
  const searchByName = dogs.filter((dog) =>
    dog.name.toLowerCase().includes(name.toLowerCase())
  );
  // if(searchByName.length === 0){
  // return {error:"no hay concidencias para su busqueda"}
  // }
  return cleanArray(searchByName)
}

module.exports = { cleanArray, cleanTemperaments, infoDogClean,findNameApi };
