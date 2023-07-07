import { useNavigate } from "react-router-dom";
import UserModel from "../../../models/userModel";
import authService from "../../../services/authService";
import "./Register.css";
import { useForm } from "react-hook-form";


function Register(): JSX.Element {
    const navigate = useNavigate()
    async function send(user:UserModel): Promise<void>{
        try {
            await authService.register(user)
            alert("Welcome to our dream vacation world")   
            navigate ("/all-vacations")

            
        } 
        catch (error) {
            
        }
        
    }
    const {register, handleSubmit, formState} = useForm<UserModel>()

    return (
        <div className="Register">
			<form onSubmit={handleSubmit(send)}>
            <span className="errSpan">{formState.errors.firstName?.message}</span>
                <input type="text" {...register("firstName",UserModel.firtNameValidation)} placeholder="firstName"/>
               
                <span className="errSpan">{formState.errors.lastName?.message}</span>
                <input type="text"{...register("lastName", UserModel.lastNameValidation)} placeholder="lastName"/>
                
                <span className="errSpan">{formState.errors.email?.message}</span>
                <input type="email"{...register("email", UserModel.emailValidation)} placeholder="email"/>
                
                <span className="errSpan">{formState.errors.password?.message}</span>
                <input type="password"{...register("password", UserModel.passwordValidation)} placeholder="password"/>
                
                <button className="button">SEND</button>
            </form>
        </div>
    );
}
export default Register
