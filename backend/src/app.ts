import express from "express"
import routeNotFound from "./3-middleware/RouteNotFound"
import catchAll from "./3-middleware/catchAll"
import appConfig from "./2-utils/appConfig"
import vacation from "./6-controllers/vacationControler"
import authController from "./6-controllers/authController"


const server = express()

server.use(express.json())

server.use("/api",vacation)

server.use("/api",authController)

server.use("*",routeNotFound)

server.use(catchAll)

server.listen(appConfig.port,(()=>console.log(`listen on port${appConfig.port}`)))
