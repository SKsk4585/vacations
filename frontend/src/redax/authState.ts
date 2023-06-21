import jwtDecode from "jwt-decode";
import UserModel from "../models/userModel";
import { create } from "domain";
import { createStore } from "redux";

//יצירת מצב global state
export class AuthState{
    public user:UserModel = null
    public token:string = null

    public constructor(){
        if(sessionStorage.getItem("token")){
            this.token = sessionStorage.getItem("token")
            const contaner:{user: UserModel} = jwtDecode(this.token)
            this.user = contaner.user
        }
    }
}

//action type<enum>
export enum AuthActionType{
    login, logout, register
}

//interface
export interface AuthAction{
    type:AuthActionType
    payload?:string
}

//reducer
export function AuthReducer(currentState = new AuthState(), action:AuthAction):AuthState{
    const newState = {...currentState}
    switch (action.type){
        case AuthActionType.login:
        case AuthActionType.register:
            newState.token = action.payload
            const contaner:{user: UserModel} = jwtDecode(newState.token)
            newState.user = contaner.user
            //save
            sessionStorage.setItem("token", newState.token)
            break
        case AuthActionType.logout:
            newState.token = null
            newState.user = null
            sessionStorage.removeItem("token")
            break
    }
    return newState
}

//create srore
export const authStore = createStore(AuthReducer)