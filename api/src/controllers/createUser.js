const { User } = require("../db.js");
const createUser = async (user, password) => {
  const newUser = await User.create({ user, password });

  return newUser;
};

module.exports = createUser;
