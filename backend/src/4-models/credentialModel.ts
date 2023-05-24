import Joi from "joi"


class CredentialModel{
    public email: string
    public password: string


public constructor(user: CredentialModel){
       
        this.email = user.email
        this.password = user.password   
             
    }


//joi
public static validationSchema = Joi.object({   
    email : Joi.string().required().email().min(2).max(100),
    password : Joi.string().required().min(4).max(8),

    })
}

export default CredentialModel