import express, { NextFunction, Request, Response } from "express"
import UserModel from "../4-models/userModel"
import authLogic from "../5-logic/authLogic"



const router = express.Router()

//register
router.post("/auth/register", async(request:Request,respons:Response,next:NextFunction)=>{
    try {
        const user = new UserModel(request.body)
        const token = await authLogic.register(user)
        respons.json(token)
    }
    catch (err: any) {
         next(err)         
    }

})

export default router