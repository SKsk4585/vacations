import axios from "axios"
import appConfig from "../utils/Config"
import VacationsModel from "../models/vacationModel"





class VacationServices{

public async  getAllVacations(): Promise<VacationsModel[]>{
    const respons = await axios.get<VacationsModel[]>(appConfig.vacationUrl)
    const vacation = respons.data
    return vacation
    
} 

public async  addVacation(vacation:VacationsModel): Promise<VacationsModel>{
    const formData = new FormData()

    formData.append("destination",vacation.destination)
    formData.append("description",vacation.description)
    formData.append("startDate",vacation.startDate.toString())
    formData.append("endDate",vacation.endDate.toString())
    formData.append("price",vacation.price.toString())
    formData.append("image",vacation.image[0])

    const respons = await axios.post<VacationsModel>(appConfig.vacationUrl, formData)
    const newVacation = respons.data
    return newVacation
      
}

public async updateVacation(vacation:VacationsModel): Promise<VacationsModel>{
    const formData = new FormData()

    formData.append("destination",vacation.destination)
    formData.append("description",vacation.description)
    formData.append("startDate",vacation.startDate.toString())
    formData.append("endDate",vacation.endDate.toString())
    formData.append("price",vacation.price.toString())
    formData.append("image",vacation.image[0])
    
const respons = await axios.put<VacationsModel>(appConfig.vacationUrl, formData)
const updateVacation = respons.data
return updateVacation


}
public async getVacationsById(id:number): Promise<VacationsModel>{

    const respons = await axios.get<VacationsModel>(appConfig.vacationUrl+id)
    const vacation = respons.data
    return vacation
    
} 

public async deleteVacation(vacationId: number):Promise<void>{

await axios.delete<void>(appConfig.vacationUrl+vacationId)
}
}
const vacationServices = new VacationServices()    
export default vacationServices    