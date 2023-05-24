
import jwt from "jsonwebtoken"
import UserModel from "../4-models/userModel"

const secretKey = "vacationssarakatzburg"

function getNewToken(user:UserModel): string{

    const container = {user}
    const options = {expiresIn:"3h"}
    const token = jwt.sign(container,secretKey,options)

    return token
}

export default {
    getNewToken
}