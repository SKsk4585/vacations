import axios from "axios";
import { authStore } from "../redax/authState";


class InterceptorService {

    public createInterceptor(): void {
        axios.interceptors.request.use(request => {
            if(authStore.getState().token) {
                request.headers = {
                    authorization: "Bearer " + authStore.getState().token
                }
            }
            return request
        })
    }
}

const interceptorService = new InterceptorService()
export default interceptorService