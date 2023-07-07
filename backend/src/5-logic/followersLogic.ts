import dal from "../2-utils/dal";
import FollowerModel from "../4-models/folloewrModel";

async function addFollower(follower:FollowerModel):Promise<void>{

    const sql = `INSERT INTO followers
                 VALUES(
                    ${follower.userId},
                    ${follower.vacationId}
                 )`
        await dal.execute(sql)
    
}

async function deleteFollower(follower:FollowerModel):Promise<void>{
    const sql = `DELETE FROM followers
                 WHERE usersId =${follower.userId} 
                 AND vacationId=${follower.vacationId}`
        await dal.execute(sql)
}

async function getNumFollowers(vacationId:number): Promise<number>{

    const sql = `SELECT COUNT(*) AS num_followers
                 FROM followers
                 WHERE vacationID = ${vacationId}`
                 const resoult = await dal.execute(sql)
                 const num = resoult[0].num_followers
                 return num  
}  
async function getReport(): Promise<any[]>{

    const sql = `SELECT vacations.destination, COUNT(followers.usersId) AS followersCount
                 FROM vacations
                 LEFT JOIN followers ON vacations.vacationId = followers.vacationId
                 GROUP BY vacations.destination;`
                 const report = await dal.execute(sql)
                 return report    
}

export default{
    addFollower,
    deleteFollower,
    getNumFollowers,
    getReport

}