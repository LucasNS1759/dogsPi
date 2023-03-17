const { Router } = require("express");
const {
  getDogsHandler,
  getDogsIdRazaHandler,
  postDogsHandler,
} = require("../handlers/dogsHandlers");

const dogsRoutes = Router();

dogsRoutes.get("/name?", getDogsHandler);
dogsRoutes.get("/:id", getDogsIdRazaHandler);
dogsRoutes.post("/", postDogsHandler);

module.exports = dogsRoutes;
