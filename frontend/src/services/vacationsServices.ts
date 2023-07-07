import axios from "axios"
import appConfig from "../utils/Config"
import VacationsModel from "../models/vacationModel"


class VacationServices {

    public async getAllVacations(userId: number): Promise<VacationsModel[]> {
        const respons = await axios.get<VacationsModel[]>(appConfig.vacationUrl + userId)
        const vacation = respons.data
        return vacation

    }

    public async addVacation(vacation: VacationsModel): Promise<VacationsModel> {
        const formData = new FormData()

        formData.append("destination", vacation.destination)
        formData.append("description", vacation.description)
        formData.append("startDate", vacation.startDate.toString())
        formData.append("endDate", vacation.endDate.toString())
        formData.append("price", vacation.price.toString())
        formData.append("image", vacation.image[0])

        const respons = await axios.post<VacationsModel>(appConfig.vacationUrl, formData)
        const newVacation = respons.data
        return newVacation

    }

    public async updateVacation(vacation: VacationsModel): Promise<VacationsModel> {
        const formData = new FormData()

        formData.append("destination", vacation.destination)
        formData.append("description", vacation.description)
        formData.append("startDate", vacation.startDate.toString())
        formData.append("endDate", vacation.endDate.toString())
        formData.append("price", vacation.price.toString())
        formData.append("image", vacation.image[0])
        formData.append("imageName", vacation.imageName)

        console.log(vacation)
        const respons = await axios.put<VacationsModel>(appConfig.vacationUrl + vacation.vacationId, formData)
        const updateVacation = respons.data
        return updateVacation


    }
    public async getVacationsById(id: any): Promise<VacationsModel> {
        const respons = await axios.get<VacationsModel>(appConfig.oneVacationUrl + id)
        const vacation = respons.data
        return vacation
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete<void>(appConfig.vacationUrl + vacationId)
    }

    public async getActiveVacations(): Promise<VacationsModel[]> {
        const respons = await axios.get<VacationsModel[]>(appConfig.activeVacationsUrl)
        const vacation = respons.data
        return vacation
    }

    public async getVacationsByUser(userId: number): Promise<VacationsModel[]> {
        const respons = await axios.get<VacationsModel[]>(appConfig.vacationByUserUrl + userId)
        const vacation = respons.data
        return vacation
    }

    public async getFutureVacation(): Promise<VacationsModel[]> {
        const respons = await axios.get<VacationsModel[]>(appConfig.futureVacationUrl)
        const vacation = respons.data
        return vacation
    }


}
const vacationServices = new VacationServices()
export default vacationServices    