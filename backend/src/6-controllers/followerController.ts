import express, { NextFunction, Request, Response } from "express"
import FollowerModel from "../4-models/folloewrModel"
import followersLogic from "../5-logic/followersLogic"

const router = express.Router()

//add folower
router.post("/followers", async (request:Request,respons:Response,next:NextFunction)=>{
    try {
        const follower = new FollowerModel(request.body)
        await followersLogic.addFollower(follower)
        respons.sendStatus(201)
    } 
    catch (error) {
        next(error)        
    }
})

router.delete("/followers/:userId/:vacationId", async (request:Request,respons:Response,next:NextFunction)=>{
    try {
        const userId = +request.params.userId
        const vacationId = +request.params.vacationId
        const follower: FollowerModel = {vacationId, userId}
        await followersLogic.deleteFollower(follower)
        respons.sendStatus(204)
    } 
    catch (error) {
        next(error)        
    }
})

router.get("/follower/:vacationId", async (request:Request,respons:Response,next:NextFunction)=>{
        try {
            const vacationId = +request.params.vacationId
            const num = await followersLogic.getNumFollowers(vacationId)
            respons.json(num)
        } 
        catch (error) {
            next(error)        
        }
})


router.get("/followers/", async (request:Request,respons:Response,next:NextFunction)=>{
        try {
            const report = await followersLogic.getReport()
            respons.json(report)
        } 
        catch (error) {
            next(error)        
        }
    })


export default router