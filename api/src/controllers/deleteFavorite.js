const { Favorite, User } = require("../db.js");

const deleteFavorite = async (name, user) => {
  let result = await Favorite.destroy({
    where: { name:name },
    include: [{ model: User, where: { user:user } }],
  });
  return result;
};

module.exports = deleteFavorite;

// Favorite.findAll({
//     include: [{ model: User, where: { user: user } }],
//   });
