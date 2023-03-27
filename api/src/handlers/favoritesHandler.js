const addFavoritesDogs = require("../controllers/addFavoritesDogs");
const findFavsUser = require("../controllers/findFavsUser");
const deleteFavorite = require("../controllers/deleteFavorite");

const postFavoritesHandler = async (req, res) => {
  const { image, name, user } = req.body;

  try {
    const result = await addFavoritesDogs(image, name, user);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFavoritesHandler = async (req, res) => {
  const { user } = req.query;
  try {
    const getFavsUser = await findFavsUser(user);
    res.status(200).json(getFavsUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFavoritesHandler = async (req, res) => {
  const { name,user } = req.query;
  try {
    const result = await deleteFavorite(name,user);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postFavoritesHandler,
  getFavoritesHandler,
  deleteFavoritesHandler,
};
