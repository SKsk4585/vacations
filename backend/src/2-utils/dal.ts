import mysql from "mysql"
import appConfig from "./appConfig"

const conection = mysql.createPool({
    host:appConfig.host,
    user:appConfig.user,
    password:appConfig.password,
    database:appConfig.database
})

function execute(sql:string,valuse?:any[]):Promise<any>{
    return new Promise<any>((resolve, reject)=>{
        conection.query(sql,valuse,((err, resoult)=>{
            if(err){
                reject(err)
                return           
            }
            resolve(resoult)
        }))
    })
}export default {
    execute
}