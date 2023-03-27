const { Router } = require("express");
const {
  getDogsHandler,
  getDogsIdRazaHandler,
  postDogsHandler,
  putDogsHandler,
  deleteDogsHandler
} = require("../handlers/dogsHandlers");

const dogsRoutes = Router();

dogsRoutes.get("/name?", getDogsHandler);
dogsRoutes.get("/:id", getDogsIdRazaHandler);
dogsRoutes.post("/", postDogsHandler);
dogsRoutes.put("/:id", putDogsHandler);
dogsRoutes.delete("/:id", deleteDogsHandler);

module.exports = dogsRoutes;
