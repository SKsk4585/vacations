import express, { NextFunction, Request, Response } from "express"
import vacationLogic from "../5-logic/vacationLogic"
import VacationsModel from "../4-models/vacationModel"
import deleteMessage from "../3-middleware/delete-message"


const router = express.Router()

//get all vacations
router.get("/vacations",async (request:Request,respons:Response,next:NextFunction)=>{
    try {
        const vacation = await vacationLogic.getAllVacations()
        respons.json(vacation)
    } 
    catch (error) {
        next(error)        
    }
})

//add vacacion
router.post("/vacations",async (request:Request,respons:Response,next:NextFunction)=>{
    try {
        const vacation = new VacationsModel(request.body)
        const addedvacation = await vacationLogic.addVacation(vacation)
        respons.status(201).json(addedvacation)
    } 
    catch (error) {
        next(error)        
    }
})

//update vacacion
router.put("/vacations/:vacationId",async (request:Request,respons:Response,next:NextFunction)=>{
    try {
        const id = +request.params.vacationId
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
router.get("/vacations/:vacationId",async (request:Request,respons:Response,next:NextFunction)=>{
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
router.delete("/vacations/:vacationId",deleteMessage, async (request:Request,respons:Response,next:NextFunction)=>{
    try {
        const id = +request.params.vacationId
        await vacationLogic.deleteVacation(id)
        respons.sendStatus(204)
    } 
    catch (error) {
        next(error)        
    }
})





export default router