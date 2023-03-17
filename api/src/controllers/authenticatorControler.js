const { User } = require("../db.js");

const authenticatorControler = async (user, password) => {
  const authenticator = await User.findAll({
    where: { user: user, password: password },
  });
  return authenticator
};
module.exports = authenticatorControler;
