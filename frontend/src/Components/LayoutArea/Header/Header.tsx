import { NavLink } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import UserModel from "../../../models/userModel";
import { authStore } from "../../../redax/authState";
import RoleModel from "../../../models/roleModel";

function Header(): JSX.Element {

    const [user, setUser] = useState<UserModel>()

    useEffect(()=>{
        setUser(authStore.getState().user)

        const unsubscribe = authStore.subscribe(()=>{
            setUser(authStore.getState().user)
        })
        return ()=> unsubscribe()
    },[user])
    
    return (
        <div className="Header">
            <NavLink to={"/all-vacations"}>
            <h1>
                Welcome to the big and dreamy vacation site
            </h1>
            </NavLink>

            {!user && <>
                <NavLink to={"/login"}className={"icon"}><span className="material-symbols-outlined">mode_of_travel</span></NavLink>
                <NavLink to={"/register"}className={"icon"}><span className="material-symbols-outlined">edit_note</span></NavLink>
            </>}

            {user?.role === RoleModel.Admin && <>
                <p className="admin">Hello {user.firstName }</p>
                <NavLink to={"/add"} className={"icon"}><span className="material-symbols-outlined">add_circle</span></NavLink>                
                <NavLink to={"/logout"} className={"icon"}><span className="material-symbols-outlined">moved_location</span></NavLink>
                <NavLink to={"/report"} className={"icon"}><span className="material-symbols-outlined">auto_graph</span></NavLink>
                <NavLink to={"/csv"} className={"icon"}><span className="material-symbols-outlined">csv</span></NavLink>
            </>}

            {user?.role === RoleModel.User && <>
                <p className="user"> Hello {user.firstName }</p> 
                <NavLink to={"/logout"}className={"icon"}><span className="material-symbols-outlined">moved_location</span></NavLink>
            </>}

			
        </div>
    );
}

export default Header;
