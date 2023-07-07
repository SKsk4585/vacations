import { useNavigate } from "react-router-dom";
import "./Logout.css";
import { useEffect } from "react";
import authService from "../../../services/authService";

function Logout(): JSX.Element {

    const navigate = useNavigate()

    useEffect(()=>{

        authService.logout()
        navigate("/login")        
    },[])

    return null
}

export default Logout;
