const {Favorite,User} = require("../db.js")

const findFavsUser = async  (user) =>{
    let allFavs = await Favorite.findAll({
        include: [{ model: User,where:{user:user} }],
      });
      
      
      return allFavs
}

module.exports = findFavsUser