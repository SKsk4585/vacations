import { string } from "joi";
import UserModel from "../4-models/userModel";
import cyber from "../2-utils/cyber";
import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { validationErrorModel } from "../4-models/errorModel";
import CredentialModel from "../4-models/credentialModel";


async function register(user:UserModel) : Promise<string> {
    //If email exists:
    if(await databaseValidetion(user.email,"email")) throw new validationErrorModel(`that ${user.email} already exsist`)
    
    const sql = `INSERT INTO users 
                    VALUES(DEFAULT,
                        '${user.firstName}',
                        '${user.lastName}',
                        '${user.email}',
                        '${user.password}',
                        'user'
                        )`
         
    const token = cyber.getNewToken(user)

    return token   
}

async function login(credential:CredentialModel): Promise<string>{
    const sql = `SELECT * FROM users
                 WHERE email = ${credential.email}
                 AND password = ${credential.password}`
    const user = await dal.execute(sql)
    if(!user[0]) throw new validationErrorModel("email or password incorrect")

    const token = cyber.getNewToken(user[0])
    return token



}

async function databaseValidetion(data:string, dataName: string):Promise<boolean>{
    const sql = `SELECT COUNT(*) AS count FROM users
                 WHERE ${dataName} = '${data}'`

    const resoult = await dal.execute(sql)
    const count = resoult[0].count
    return count>0
}

export default{
    register,
    login

}