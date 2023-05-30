import express, { NextFunction, Request, Response } from "express"
import UserModel from "../4-models/userModel"
import authLogic from "../5-logic/authLogic"
import CredentialModel from "../4-models/credentialModel"



const router = express.Router()

//register
router.post("/auth/register", async(request:Request,respons:Response,next:NextFunction)=>{
    try {
        const user = new UserModel(request.body)
        const token = await authLogic.register(user)
        respons.status(201).json(token)
    }
    catch (err: any) {
         next(err)         
    }
})

//login
router.post("/auth/login", async(request:Request,respons:Response,next:NextFunction)=>{
    try {
        const user = new CredentialModel(request.body)
        const token = await authLogic.login(user)
        respons.json(token)
    }
    catch (err: any) {
         next(err)         
    }
})

export default router