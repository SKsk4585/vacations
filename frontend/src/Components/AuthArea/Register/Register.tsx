import UserModel from "../../../models/userModel";
import "./Register.css";
import { useForm } from "react-hook-form";

function Register(): JSX.Element {
    async function send(){
        try {
            
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
                <input type="date"{...register("email", UserModel.emailValidation)} placeholder="email"/>
                
                <span className="errSpan">{formState.errors.password?.message}</span>
                <input type="date"{...register("password", UserModel.passwordValidation)} placeholder="password"/>
                
                <button className="butoon">SEND</button>
            </form>
        </div>
    );
}
export default Register
