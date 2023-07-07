import { useNavigate } from "react-router-dom";
import UserModel from "../../../models/userModel";
import authService from "../../../services/authService";
import "./Login.css";
import { useForm } from "react-hook-form";
import CredentialModel from "../../../models/CredentialModel";
import { NavLink } from "react-router-dom";


function Login(): JSX.Element {
    const navigate = useNavigate()
    async function send(user:UserModel): Promise<void>{
        try {
            await authService.login(user)
            alert("Good to have you back with us")   
            navigate ("/all-vacations")

            
        } 
        catch (error) {
            
        }
        
    }
    const {register, handleSubmit, formState} = useForm<UserModel>()

    return (
        <div className="login">
			<form onSubmit={handleSubmit(send)}>
                
                <span className="errSpan">{formState.errors.email?.message}</span>
                <input type="text"{...register("email", CredentialModel.emailValidation)} placeholder="email"/>
                
                <span className="errSpan">{formState.errors.password?.message}</span>
                <input type="password"{...register("password", CredentialModel.passwordValidation)} placeholder="password"/>
                
                <button className="button">SEND</button>

            </form>

        </div>
    );
}
export default Login
