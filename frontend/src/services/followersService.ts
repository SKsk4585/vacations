import axios from "axios";
import FollowerModel from "../models/followerModel";
import appConfig from "../utils/Config";

class FollowerService{
    public async addFollower(follower: FollowerModel):Promise <void>{
        await axios.post<void>(appConfig.followerUrl, follower)
    }

    public async deleteFollower(follower: FollowerModel):Promise <void>{
        await axios.delete<void>(appConfig.followerUrl+follower.userId+"/"+follower.vacationId)
    }
   
    public async getNumFollowers(vacationId:number):Promise<number>{
        const respons =  await axios.get<number>(appConfig.followerUrl + vacationId)
        const num = respons.data
        return num
    }
    public async getReport():Promise<any[]>{
        
        const respons =  await axios.get<any[]>(appConfig.followerUrl )
        const report = respons.data
        return report
    }
}

const followerService = new FollowerService()
export default followerService