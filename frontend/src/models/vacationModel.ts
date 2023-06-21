
class VacationsModel{
    public vacationId: number  
    public destination: string
    public description: string
    public startDate: string
    public endDate: string
    public price: string
    public image: FileList
    public imageName: string

   public static destinationValidation = {
        required:{ value:true, message:"destination!!!"},
        minlength: {value:5, message:"destination is too short"},
        maxlength: {value:30, message:"destination is too long"}
   }

   public static descriptionValidation = {
        required:{ value:true, message:"description!!@"},
        minlength: {value:5, message:"description is too short"},
        maxlength: {value:400, message:"destination is too long"}
   } 

   public static startDateValidation = {
        required:{ value:true, message:"date!!!"},
        validate: (value:string) => {
        const now = new Date().toISOString()
        return value >= now || "The date has passed"
       }
    } 
   
    public static endDateValidation = {
        required:{ value:true, message:"date!!!"},
        validate: (value:string, {startDate}: VacationsModel) => {
        return  value > startDate || "End date must be after start date"
       }
    } 

    public static priceValidation = {
        required:{ value:true, message:"price!!!"},
        min: {value:0, message: "price is too low"},
        max: {value:10000, message: "price is too high"}  
    }
    public static imageValidation = {
        required:{ value:true, message:"image!!!"},
    }
}

export default VacationsModel

