const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRoutes = require("./dogsRoutes")
const temperamentsRoutes = require("./temperamentsRoutes")
const userRoutes = require("./userRoutes")
const FavoritesRoutes = require("./FavoritesRoutes")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs",dogsRoutes)
router.use("/temperaments",temperamentsRoutes)
router.use("/user",userRoutes)
router.use("/Favorites",FavoritesRoutes)



module.exports = router;
