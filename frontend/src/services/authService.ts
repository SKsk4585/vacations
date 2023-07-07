import axios from "axios"
import UserModel from "../models/userModel"
import appConfig from "../utils/Config"
import { AuthActionType, authStore } from "../redax/authState"
import CredentialModel from "../models/CredentialModel"

class AuthService{

public async  register(user:UserModel) : Promise<void> {
    const response = await axios.post<string> (appConfig.registerUrl, user)
    const token = response.data
    

    authStore.dispatch({type:AuthActionType.register, payload:token})
    console.log(authStore.getState())
}


public async  login(crential:CredentialModel) : Promise<void> {
    const response = await axios.post<string> (appConfig.credentialUrl, crential)
    const token = response.data

    authStore.dispatch({type:AuthActionType.login, payload:token})
}

public logout() : void {
    
    authStore.dispatch({type:AuthActionType.logout})
}

}

const authService = new AuthService()

export default authService