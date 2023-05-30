import {Request} from "express"
import jwt from "jsonwebtoken"
import UserModel from "../4-models/userModel"

//create secretKey => unique string for oour REST API
const secretKey = "vacationssarakatzburg"

function getNewToken(user:UserModel): string{
    //create a container for the user object
    const container = {user}

    //create expration time
    const options = {expiresIn:"3h"}

    //create token
    const token = jwt.sign(container,secretKey,options)

    return token
}

function verifyToken(request: Request): Promise<boolean>{
    return new Promise<boolean>((resolve,reject)=>{
        try {
            //extract Header
            const header = request.header("authrization")

            //if not such header
            if(!header) {
                resolve(false) // because jwt login
                return
            }

           //extract token from Header
           const token = header.substring(7)

           //if there is not token
           if (!token){
            resolve(false)
            return

            //veify token
            jwt.verify(token, secretKey, error =>{
                if (error){
                    resolve(false)
                    return

                    //here token must be legal
                    resolve(true)
                }
            })
           }


            
        } 
        catch (err) {
            reject(err)            
        }

    })
}

export default {
    getNewToken,
    verifyToken
}