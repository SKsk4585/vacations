import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import VacationsModel from "../../../models/vacationModel";
import "./vacationCard.css";
import FollowButton from '../FollowButton/FollowButton';
import DiscriptionButton from '../DiscriptionButton/DiscriptionButton';
import { SyntheticEvent, useEffect, useState } from 'react';
import UserModel from '../../../models/userModel';
import { authStore } from '../../../redax/authState';
import RoleModel from '../../../models/roleModel';
import { NavLink, useNavigate } from 'react-router-dom';
import vacationServices from '../../../services/vacationsServices';


interface VacationCardProps {
	vacation: VacationsModel
    deleteVacation: (vacationId: number)=>void
}

function VacationCard(props: VacationCardProps): JSX.Element { 
    const navigate = useNavigate()
    
    const [user, setUser] = useState<UserModel>()

    useEffect(()=>{
        setUser(authStore.getState().user)

        const unsubscribe = authStore.subscribe(()=>{
            setUser(authStore.getState().user)
        })

        return ()=> unsubscribe()
    },[user])
    async function deleteVacation(){
        try {
            if(!window.confirm("Are you sure you want to delete?")) return
            await vacationServices.deleteVacation(props.vacation.vacationId)
            alert ("The deletion was successful") 
            props.deleteVacation(props.vacation.vacationId)                       
        } 
        catch (error) {
            console.log(error)            
        }
    }

    return (
        <div className="vacationCard">
            <Card sx={{ maxWidth: 345 }} className='card'>
            <CardMedia>
                <DiscriptionButton discription={props.vacation.description} destination={props.vacation.destination} vacationId={props.vacation.vacationId}/>
                       
            </CardMedia>


            <CardContent>

                <Typography variant="body2" color="text.secondary" className='date'>
                    <span>From: {props.vacation.startDate }   To: {props.vacation.endDate} </span> <br/>  <br/>                   
                </Typography>
                <Typography variant="body2" color="text.secondary" className='price'>                  
                    <span>Price: {props.vacation.price}$</span>
                </Typography>
            </CardContent>
            <CardActions>
                {user?.role === RoleModel.User && 
            <FollowButton vacationId={props.vacation.vacationId} userId={user?.userId} isFollow={props.vacation.isFollow}  />
                }
                {user?.role === RoleModel.Admin && <>
                    <NavLink to={"/update/"+props.vacation.vacationId}className={"update"}><span className="material-symbols-outlined">app_registration</span></NavLink>
                    <button className={"delete"} onClick={deleteVacation}><span className="material-symbols-outlined">delete</span></button>
                    </>
                }           

            </CardActions>
            </Card> 
			
        </div>
    );
}

export default VacationCard;









