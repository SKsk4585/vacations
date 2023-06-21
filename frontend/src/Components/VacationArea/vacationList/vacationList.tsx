import { useEffect, useState } from "react";
import VacationCard from "../vacationCard/vacationCard";
import "./vacationList.css";
import VacationsModel from "../../../models/vacationModel";
import vacationServices from "../../../services/vacationsServices";

function VacationList(): JSX.Element {

    const [vacation, setVacation] = useState<VacationsModel[]>([])

    useEffect(()=>{
        vacationServices.getAllVacations()
            .then(v => setVacation(v))
            .catch(error => console.log(error))
        console.log(vacation)
    },[])
 
    return (
        <div className="vacationList">
            
            {vacation.map(v =>
			<VacationCard vacation={v} key={v.vacationId} />
            )}
        </div>
    );
}

export default VacationList;
