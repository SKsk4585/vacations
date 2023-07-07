import { ChangeEvent, useEffect, useState } from "react";
import VacationCard from "../vacationCard/vacationCard";
import "./vacationList.css";
import VacationsModel from "../../../models/vacationModel";
import vacationServices from "../../../services/vacationsServices";
import UserModel from "../../../models/userModel";
import { authStore } from "../../../redax/authState";
import { useNavigate } from "react-router-dom";
import RoleModel from "../../../models/roleModel";
import { Pagination } from "@mui/material";

function VacationList(): JSX.Element {

    const [vacation, setVacation] = useState<VacationsModel[]>([])
    const [user, setUser] = useState<UserModel>()

    //Set Pagination:
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const vacationPerPage = 10
                
    useEffect(()=>{
        setUser(authStore.getState().user)
        vacationServices.getAllVacations(user?.userId)
            .then(v => {
                setVacation(v)
                setPageNumber(Math.ceil(v.length/vacationPerPage)) 
            })
            .catch(error => console.log(error))
            const unsubscribe = authStore.subscribe(()=>{
                setUser(authStore.getState().user)
            })                 
            
            return ()=>unsubscribe()
    },[user])



    async function handleUser():Promise<void>{
        try {
            const vacations = await vacationServices.getVacationsByUser(user.userId)
            setVacation(vacations)           
        } 
        catch (error) {
            console.log(error)            
        }        
    }
    async function handleActive():Promise<void>{
        try {
            const vacations = await vacationServices.getActiveVacations()
            setVacation(vacations)
            setPageNumber(Math.ceil(vacations.length/vacationPerPage))                       
        } 
        catch (error) {
            console.log(error)                    
        }

    }
    async function handleFuture():Promise<void>{
        try {
            const vacations = await vacationServices.getFutureVacation()
            setVacation(vacations)
            setPageNumber(Math.ceil(vacations.length/vacationPerPage))             
        } 
        catch (error) {
            console.log(error)                    
        }

    }
    async function handleBack():Promise<void>{
        try {
            const vacations = await vacationServices.getAllVacations(user.userId)
            setVacation(vacations)
            setPageNumber(Math.ceil(vacations.length/vacationPerPage))                   
        } 
        catch (error) {
            console.log(error)                    
        }

    }

    function HandleChangePage(event:ChangeEvent<unknown>, newPage: number) {

        setCurrentPage(newPage)
    }

    function deleteVacation(vacationId: number): void{
        const newVacationArr = vacation.filter(v=>v.vacationId !== vacationId)
        setVacation(newVacationArr)
    }
 
    return (        <div className="vacationList">
            <div className="filters">
                {user?.role === RoleModel.User &&
                    <button onClick={handleUser}>My vacations</button>    }
                <button onClick={handleActive}>Active vacations</button>    
                <button onClick={handleFuture}>Future vacations</button>    
                <button onClick={handleBack}>clear</button>    
            </div>            
            {vacation?.slice((currentPage-1)*vacationPerPage,currentPage*vacationPerPage).map(v =>
			<VacationCard vacation={v} key={v.vacationId} deleteVacation={()=>deleteVacation(v.vacationId)} />
            )}
            <Pagination className="Pagination" count={pageNumber} page={currentPage} onChange={HandleChangePage} color="primary"/>

        </div>

    );
}

export default VacationList;
