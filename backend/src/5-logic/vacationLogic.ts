import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import vacationModel from "../4-models/vacationModel";
import { ResouceNotFoundErrorModel, validationErrorModel } from "../4-models/errorModel";
import {v4 as uuid} from "uuid"
import fs from 'fs'

async function getAllVacations(userId: number): Promise<vacationModel[]>{
    const sql = `SELECT v.*, 
                    DATE_FORMAT(v.startDate, '%d/%m/%Y') AS startDate,
                    DATE_FORMAT(v.endDate, '%d/%m/%Y') AS endDate,
                    IF(f.usersId IS NOT NULL, 1, 0) AS isFollow
                    FROM vacations AS v
                    LEFT JOIN followers AS f ON v.vacationId = f.vacationId
                    AND f.usersId = ?`
    const vacation = await dal.execute(sql, [userId])
    return vacation    
} 

async function addVacation(vacation:vacationModel): Promise<vacationModel>{

    //validation
    const errors = vacation.addValidate()
    if (errors) throw new validationErrorModel(errors)
    const extention = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
    vacation.imageName = uuid()+extention

    const sql = `INSERT INTO vacations 
                VALUES(DEFAULT,
                    ?,?,?,?,?,?
                    )`

        vacation.image.mv("./src/1-assets/images/" +vacation.imageName)
        delete vacation.image
        const info:OkPacket = await dal.execute(sql, [vacation.destination,
                                                      vacation.description,
                                                      vacation.startDate,
                                                      vacation.endDate,
                                                      vacation.price,
                                                      vacation.imageName
        ])
        vacation.vacationId = info.insertId
        return vacation
      
}

async function updateVacation(vacation:vacationModel): Promise<vacationModel>{
    
    //validation
    const errors = vacation.updateValidate()
    if (errors) throw new validationErrorModel(errors)

    const imageName = await dal.execute(`SELECT imageName FROM vacations WHERE vacationId = ${vacation.vacationId}`)

    if(vacation.image){
        const extention = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        vacation.imageName = uuid()+extention
        vacation.image.mv("./src/1-assets/images/" +vacation.imageName)
        delete vacation.image

        //Delete prev image:
        if(fs.existsSync("./src/1-assets/images/" + imageName[0].imageName))
            fs.unlinkSync("./src/1-assets/images/" + imageName[0].imageName)
    }
    else{
        vacation.imageName = imageName[0].imageName
    }

    
    const sql = `UPDATE vacations 
                SET
                    destination = ?,
                    description = ?,
                    startDate = ?,
                    endDate = ?,
                    price = ?,
                    imageName = ?
                WHERE vacationId = ?`  

    const info:OkPacket = await dal.execute(sql, [vacation.destination,
                                                    vacation.description,
                                                    vacation.startDate,
                                                    vacation.endDate,
                                                    vacation.price,
                                                    vacation.imageName,
                                                    vacation.vacationId])
    if(info.affectedRows === 0) throw new ResouceNotFoundErrorModel(vacation.vacationId)
    return vacation
}


async function getVacationsById(id:number): Promise<vacationModel>{
    const sql = `SELECT *, 
    DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate,
    DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate
    FROM vacations
                 WHERE vacationId = ?`
    const vacation = await dal.execute(sql,[id])
    if(!vacation[0]) throw new ResouceNotFoundErrorModel(id)
    return vacation[0]    
} 

async function deleteVacation(vacationId: number):Promise<void>{
    const sql = `DELETE FROM vacations
                 WHERE vacationId = ${vacationId}`;                                
    const info:OkPacket = await dal.execute(sql)
    if(info.affectedRows === 0) throw new ResouceNotFoundErrorModel(vacationId)
    }

async function getVacatioImages(vacationId: number): Promise<string> {
    const sql = `SELECT imageName FROM vacations 
                 WHERE vacationId =? `
    const result = await dal.execute(sql,[vacationId])
    const imageName = result[0].imageName
    if (!imageName ) throw new ResouceNotFoundErrorModel(vacationId)
    return imageName    
}

async function getVacationsByUser(userId:number): Promise<vacationModel[]>{
    const sql = `SELECT V.*, 
        DATE_FORMAT (V.startDate, '%Y-%m-%d') AS startDate,
        DATE_FORMAT(V.endDate, '%Y-%m-%d') AS endDate
        FROM vacations AS V
        JOIN followers AS F ON V.vacationId = F.vacationId
        WHERE F.usersId = ?`
    const vacation = await dal.execute(sql, [userId])
    if(!vacation) throw new ResouceNotFoundErrorModel(userId)
    return vacation    
}

async function getActiveVacations(): Promise<vacationModel[]>{
    const sql = `SELECT *, 
        DATE_FORMAT (startDate, '%Y-%m-%d') AS startDate,
        DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate
        FROM vacations
        WHERE startDate <= CURDATE()
              AND endDate > CURDATE(); 
      `
    const vacation = await dal.execute(sql)
     return vacation    
}

async function getFutureVacation(): Promise<vacationModel[]>{
    const sql = `SELECT *, 
        DATE_FORMAT (startDate, '%Y-%m-%d') AS startDate,
        DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate
        FROM vacations
        WHERE startDate > CURDATE() `
    const vacation = await dal.execute(sql)
     return vacation    
}    
export default {
    getAllVacations,
    addVacation,
    updateVacation,
    getVacationsById,
    deleteVacation,
    getVacatioImages,
    getVacationsByUser,
    getActiveVacations,
    getFutureVacation
}