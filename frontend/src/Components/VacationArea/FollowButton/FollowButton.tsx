import "./FollowButton.css";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { useEffect, useState } from "react";
import followerService from "../../../services/followersService";
import FollowerModel from "../../../models/followerModel";

interface FollowButtonProp {
  vacationId: number
  userId: number 
  isFollow: number 
}
function FollowButton(prop: FollowButtonProp): JSX.Element {

  const follower: FollowerModel = {vacationId: prop.vacationId, userId: prop.userId}

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [follow, setFollow] = useState<boolean>(false)
  const [num, setNum] = useState<number>(0)

  useEffect(()=>{
    followerService.getNumFollowers(prop.vacationId)
     .then(n=>setNum(n))
     .catch(err=> console.log(err))
     if(prop.isFollow >0) setFollow(true)
  },[]) 

  async function handleFollow(){
    if(follow){
      try {
        setFollow (false) 
        await followerService.deleteFollower(follower)
        setNum(num-1)
      } 
      catch (error) {
        
      }

    } 
    else {
      setFollow(true)
      try {
        await followerService.addFollower(follower)
        setNum(num+1)
      } 
      catch (error) {
        console.log(error)        
      }
    }
  }
    return (
        <div className="FollowButton">
      <Checkbox {...label} icon={<span className="material-symbols-outlined">cardiology</span>}
       checkedIcon={<span className="material-symbols-outlined">cardiology</span>} checked={follow}
        onChange={handleFollow}/>
        {num}
      
        </div>
    );
}

export default FollowButton;
