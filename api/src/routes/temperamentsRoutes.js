const { Router } = require('express');
const getTemperamentsHadler = require("../handlers/temperamentsHandler")

const temperamentsRoutes = Router()

temperamentsRoutes.get("/",getTemperamentsHadler)


module.exports = temperamentsRoutes