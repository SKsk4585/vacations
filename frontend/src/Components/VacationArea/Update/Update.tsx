import { useForm } from "react-hook-form";
import "./Update.css";
import VacationsModel from "../../../models/vacationModel";
import vacationServices from "../../../services/vacationsServices";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import appConfig from "../../../utils/Config";

function Update(): JSX.Element {
  const { vacationId } = useParams();
  const [vacation, setVacation] = useState<VacationsModel>();

  const { register, handleSubmit, formState, setValue } = useForm<VacationsModel>();

  useEffect(() => {
    vacationServices
      .getVacationsById(vacationId)
      .then((v) =>{
        setValue("vacationId" , v.vacationId)
        setValue("destination" , v.destination)
        setValue("description",v.description)
        setValue("startDate", v.startDate)
        setValue("endDate",v.endDate)
        setValue("price",v.price)
        setValue("imageName",v.imageName)
      } )
      .catch((err) => alert(err));
     

  }, []);

  const navigate = useNavigate();


  async function send(updateVacation: VacationsModel): Promise<void> {
    try {

      console.log(updateVacation);
      await vacationServices.updateVacation(updateVacation);
      alert("The update was added successfully");
      navigate("/all-vacations");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Update">
      <form onSubmit={handleSubmit(send)}>
      <input type="hidden" {...register("vacationId")} />
        <span className="errSpan">{formState.errors?.destination?.message}</span>
        <input
          type="text"         
          {...register("destination", VacationsModel.destinationValidation)}
          name="destination"
        />

        <span className="errSpan">{formState.errors.description?.message}</span>
        <input
          type="text"
          {...register("description" , VacationsModel.descriptionValidation)}
        />

        <span className="errSpan">{formState.errors.startDate?.message}</span>
        <label>start date</label>
        <input
          type="date"
          {...register("startDate",{required:{value: true, message:"Start Date!"}})}
        />

        <span className="errSpan">{formState.errors?.endDate?.message}</span>
        <label>end date</label>
        <input
          type="date"
          {...register("endDate", VacationsModel.endDateValidation)}
        />

        <span className="errSpan">{formState.errors.price?.message}</span>
        <input
          type="number"
          {...register("price" , VacationsModel.priceValidation)}
        />

        <input type="file" accept="image/*" placeholder="image"  {...register("image" )}/>
        <img src={appConfig.vacationImageUrl + vacationId} className="image" />
        <button className="button">SEND</button>
      </form>
    </div>
  );
}

export default Update;
