const createUser = require("../controllers/createUser");
const authenticatorControler = require("../controllers/authenticatorControler")

const createUseHandler = async (req, res) => {
  const { user, password } = req.body;

  try {
    const resutl = await createUser(user, password);
    res.status(200).json(resutl);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const authenticatorHandler = async(req,res) =>{
const {user, password} = req.query
try {
  const authenticator = await authenticatorControler(user,password)
  res.status(200).json(authenticator)
} catch (error) {
  res.status(400).json({ error: error.message });
}
}

module.exports = {createUseHandler,authenticatorHandler};
