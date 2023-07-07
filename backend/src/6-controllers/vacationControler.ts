import express, { NextFunction, Request, Response } from "express"
import vacationLogic from "../5-logic/vacationLogic"
import VacationsModel from "../4-models/vacationModel"
import deleteMessage from "../3-middleware/delete-message"
import path from "path"
import verifyLoggedIn from "../3-middleware/verify-logged-in"


const router = express.Router()

//get all vacations
router.get("/vacations/:userId",verifyLoggedIn, async (request:Request,respons:Response,next:NextFunction)=>{
    try {
        const userId = +request.params.userId
        const vacation = await vacationLogic.getAllVacations(userId)
        respons.json(vacation)
    } 
    catch (error) {
        next(error)        
    }
})

//add vacacion
router.post("/vacations",verifyLoggedIn, async (request:Request,respons:Response,next:NextFunction)=>{
    try {
        request.body.image = request.files?.image
        const vacation = new VacationsModel(request.body)
        const addedvacation = await vacationLogic.addVacation(vacation)
        respons.status(201).json(addedvacation)
    } 
    catch (error) {
        next(error)        
    }
})

//update vacacion
router.put("/vacations/:vacationId",verifyLoggedIn, async (request:Request,respons:Response,next:NextFunction)=>{
    try {
        const id = +request.params.vacationId
        request.body.image = request.files?.image

        const vacation = new VacationsModel(request.body)
        vacation.vacationId = id
        const addedvacation = await vacationLogic.updateVacation(vacation)
        respons.status(201).json(addedvacation)
    } 
    catch (error) {
        next(error)        
    }
})

//get vacations by id
router.get("/vacation/:vacationId",verifyLoggedIn, async (request:Request,respons:Response,next:NextFunction)=>{
    try {
        const id = +request.params.vacationId
        const vacation = await vacationLogic.getVacationsById(id)
        respons.json(vacation)
    } 
    catch (error) {
        next(error)        
    }
})


//delete vacations 
router.delete("/vacations/:vacationId",deleteMessage,verifyLoggedIn, async (request:Request,respons:Response,next:NextFunction)=>{
    try {
        const id = +request.params.vacationId
        await vacationLogic.deleteVacation(id)
        respons.sendStatus(204)
    } 
    catch (error) {
        next(error)        
    }
})

//get image
router.get("/vacationsimage/:vacationId", async(request:Request,respons:Response,next:NextFunction)=>{
    try {
        const id = +request.params.vacationId
        const imageName = await vacationLogic.getVacatioImages(id)
        const image = path.join(__dirname,"..", "1-assets", "images", imageName)
        respons.sendFile(image)
    } 
    catch (error) {
        next(error)        
    }
})

//get vacations by user
router.get("/vacationsByUser/:userId", async(request:Request,respons:Response,next:NextFunction)=>{
    try {
        const userId = +request.params.userId
        const vacations = await vacationLogic.getVacationsByUser(userId)        
        respons.json(vacations)
    } 
    catch (error) {
        next(error)        
    }
})
//get active vacations
router.get("/activeVacations/", async(request:Request,respons:Response,next:NextFunction)=>{
    try {
        const vacations = await vacationLogic.getActiveVacations()        
        respons.json(vacations)
    } 
    catch (error) {
        next(error)        
    }
})
//future vacation
router.get("/futureVacation/", async(request:Request,respons:Response,next:NextFunction)=>{
    try {
        const vacations = await vacationLogic.getFutureVacation()        
        respons.json(vacations)
    } 
    catch (error) {
        next(error)        
    }
})

export default router