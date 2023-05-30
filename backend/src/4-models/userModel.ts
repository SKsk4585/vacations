import Joi from "joi"
import RoleModel from "./roleModel"

class UserModel{
    public userId: number  
    public firstName: string
    public lastName: string
    public email: string
    public password: string
    public role: RoleModel

    public constructor(user: UserModel){
        this.userId = user.userId
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.password = user.password
        this.role = user.role
             
    }
        //joi
        public static validationSchema = Joi.object({
            userId : Joi.number().optional().positive().integer(),
            firstName : Joi.string().required().min(2).max(30),
            lastName : Joi.string().required().min(2).max(30),
            email : Joi.string().required().email().min(2).max(100),
            password : Joi.string().required().min(4).max(8),
            role : Joi.string().required().min(2).max(10),
                    

        })
}

export default UserModel