import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import vacationModel from "../4-models/vacationModel";
import { ResouceNotFoundErrorModel } from "../4-models/errorModel";




async function getAllVacations(): Promise<vacationModel[]>{
    const sql = `SELECT * FROM vacations`
    const vacation = await dal.execute(sql)
    return vacation
    
} 

async function addVacation(vacation:vacationModel): Promise<vacationModel>{
    const sql = `INSERT INTO vacations 
                VALUES(DEFAULT,
                    '${vacation.destination}',
                    '${vacation.description}',
                    '${vacation.startDate}',
                    '${vacation.endDate}',
                    '${vacation.price}',
                    '${vacation.imageName}'
                    )`
        const info:OkPacket = await dal.execute(sql)
        vacation.vacationId = info.insertId
        return vacation
      
}

async function updateVacation(vacation:vacationModel): Promise<vacationModel>{
    const sql = `UPDATE vacations 
                 SET
                    destination = '${vacation.destination}',
                    description = '${vacation.description}',
                    startDate = '${vacation.startDate}',
                    endDate = '${vacation.endDate}',
                    price = '${vacation.price}',
                    imageName = '${vacation.imageName}'
                    WHERE vacationId = ${vacation.vacationId}`
        const info:OkPacket = await dal.execute(sql)
        if(info.affectedRows === 0) throw new ResouceNotFoundErrorModel(vacation.vacationId)
        return vacation
}


async function getVacationsById(id:number): Promise<vacationModel>{
    const sql = `SELECT * FROM vacations
                 WHERE vacationId = ${id}`
    const vacation = await dal.execute(sql)
    if(!vacation[0]) throw new ResouceNotFoundErrorModel(id)
    return vacation[0]
    
} 

async function deleteVacation(vacationId: number):Promise<void>{
    const sql = `DELETE FROM vacations
                 WHERE vacationId = ${vacationId}`;                                
    const info:OkPacket = await dal.execute(sql)
    if(info.affectedRows === 0) throw new ResouceNotFoundErrorModel(vacationId)
}


    
export default {
    getAllVacations,
    addVacation,
    updateVacation,
    getVacationsById,
    deleteVacation

}