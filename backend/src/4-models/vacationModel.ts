import { UploadedFile } from "express-fileupload"
import Joi from "joi"

class VacationsModel{
    public vacationId: number  
    public destination: string
    public description: string
    public startDate: string
    public endDate: string
    public price: string
    public image: UploadedFile
    public imageName: string

    public constructor(vacations: VacationsModel){
        this.vacationId = vacations.vacationId
        this.destination = vacations.destination
        this.description = vacations.description
        this.startDate = vacations.startDate
        this.endDate = vacations.endDate
        this.price = vacations.price
        this.image = vacations.image
        this.imageName = vacations.imageName
     
    }

    //joi
    public static validationSchema = Joi.object({
        vacationId : Joi.number().optional().positive().integer(),
        destination : Joi.string().required().min(2).max(100),
        description : Joi.string().required().min(2).max(300),
        startDate : Joi.date().min('now').required(),
        endDate : Joi.date().min(Joi.ref('startDate')).required(),
        price : Joi.number().required().min(100).max(10000),
        image : Joi.object().required(),
        imageName : Joi.optional()
    })

    public validate() :string {
        const result = VacationsModel.validationSchema.validate(this, {abortEarly: false})
        return result.error?.message
    }
   
}

export default VacationsModel