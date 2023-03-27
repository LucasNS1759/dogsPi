const { Favorite, User } = require("../db.js");

const addFavoritesDogs = async (
  image,
  name,
  user
) => {
  const newFav = await Favorite.create({
    image,
    name,
   
  });
 

  let findUser = await User.findAll({ where: { user: user } });
  
 
  let addUserFav = await newFav.addUsers(findUser);
 

  const userWhitDogsFav = await Favorite.findByPk(newFav.id, {
    include: [{ model: User}],
  });

  return userWhitDogsFav;
};

module.exports = addFavoritesDogs;
