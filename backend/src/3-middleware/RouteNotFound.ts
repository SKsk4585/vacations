import { NextFunction, Request, Response } from "express";
import { RouteNotFoundErrorModel } from "../4-models/errorModel";




function routeNotFound(request:Request,respons:Response,next:NextFunction){
    const err = new RouteNotFoundErrorModel(request.originalUrl)
    next (err)
}

export default routeNotFound