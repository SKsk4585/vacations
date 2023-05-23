import Joi from "joi"

class VacationsModel{
    public vacationId: number  
    public destination: string
    public description: string
    public startDate: string
    public endDate: string
    public price: string
    public imageName: string

    public constructor(vacations: VacationsModel){
        this.vacationId = vacations.vacationId
        this.destination = vacations.destination
        this.description = vacations.description
        this.startDate = vacations.startDate
        this.endDate = vacations.endDate
        this.price = vacations.price
        this.imageName = vacations.imageName
     
    }

    //joi
    public static validationSchema = Joi.object({
        vacationId : Joi.number().optional().positive().integer(),
        dastination : Joi.string().required().min(2).max(100),
        Description : Joi.string().required().min(2).max(300),
        startDate : Joi.string().required().email().min(2).max(100),
        endDate : Joi.string().required().min(2).max(300),
        price : Joi.number().required().min(100).max(5000),
        imageName : Joi.string().required(),
                

    })

   
}



export default VacationsModel