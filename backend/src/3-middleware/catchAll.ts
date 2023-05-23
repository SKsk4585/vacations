import { NextFunction, Request, Response } from "express";



function catchAll(err:any,request:Request,respons:Response,next:NextFunction){
    console.log (err)
    respons.status(err.status || 500).send(err.msg)
}

export default catchAll