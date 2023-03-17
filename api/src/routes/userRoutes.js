const {Router} = require("express")
const {createUseHandler,authenticatorHandler} = require("../handlers/userHandler")

const userRouter = Router()

userRouter.post("/",createUseHandler)
userRouter.get("/authenticator?",
authenticatorHandler)

module.exports = userRouter