const {Router} = require("express")
const {postFavoritesHandler,getFavoritesHandler,deleteFavoritesHandler} = require("../handlers/favoritesHandler")

const FavoritesRoutes = Router()

FavoritesRoutes.post("/",postFavoritesHandler)
FavoritesRoutes.get("/?",getFavoritesHandler)
FavoritesRoutes.delete("/?",deleteFavoritesHandler)

module.exports = FavoritesRoutes