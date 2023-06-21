import { useForm } from "react-hook-form";
import "./Add.css";
import VacationsModel from "../../../models/vacationModel";
import vacationServices from "../../../services/vacationsServices";
import { useNavigate } from "react-router-dom";

function Add(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<VacationsModel>()
    const navigate = useNavigate()

    async function send(vacation: VacationsModel): Promise<void>{
        try {
            await vacationServices.addVacation(vacation)
            alert ("The vacation was successfully added")
            navigate("/all-vacations")
        } 
        catch (error) {
            
        }
       
    }

    return (
        <div className="Add">
			<form onSubmit={handleSubmit(send)}>
            <span className="errSpan">{formState.errors.destination?.message}</span>
                <input type="text" {...register("destination",VacationsModel.destinationValidation)} placeholder="Destination"/>
               
                <span className="errSpan">{formState.errors.description?.message}</span>
                <input type="text"{...register("description", VacationsModel.descriptionValidation)} placeholder="description"/>
                
                <span className="errSpan">{formState.errors.startDate?.message}</span>
                <label>start date</label>
                <input type="date"{...register("startDate", VacationsModel.startDateValidation)} placeholder="startDate"/>
                
                <span className="errSpan">{formState.errors.endDate?.message}</span>
                <label>end dete</label>
                <input type="date"{...register("endDate", VacationsModel.endDateValidation)} placeholder="endDate"/>
                
                <span className="errSpan">{formState.errors.price?.message}</span>
                <input type="number"{...register("price", VacationsModel.priceValidation)} placeholder="price"/>
                
                <span className="errSpan">{formState.errors.image?.message}</span>
                <input type="file" accept="image/*"{...register("image")} placeholder="image"/>
                

                


                <button className="butoon">SEND</button>
            </form>
        </div>
    );
}

export default Add;
