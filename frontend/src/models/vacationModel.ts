
class VacationsModel{
    public vacationId: number  
    public destination: string
    public description: string
    public startDate: string
    public endDate: string
    public price: string
    public image: FileList
    public imageName: string
    public isFollow: number

   public static destinationValidation = {
        required:{ value:true, message:"destination!!!"},
        minlength: {value:5, message:"Minimum 5 characters"},
        maxlength: {value:30, message:"Maximum 30 characters"}
   }

   public static descriptionValidation = {
        required:{ value:true, message:"description!!"},
        minlength: {value:5, message:"Minimum 5 characters"},
        maxlength: {value:400, message:"Maximum 30 characters"}
   } 

   public static startDateValidation = {
        required:{ value:true, message:"date!!!"},
        validate: (value:string) => {
        const now = new Date().toISOString()
        return value >= now || "The date has passed"
       }
    } 
    public static startDateUpdateValidation = {
        required:{ value:true, message:"date!!!"},
       
    } 
   
    public static endDateValidation = {
        required:{ value:true, message:"date!!!"},
        validate: (value:string, {startDate}: VacationsModel) => {
        return  value > startDate || "End date must be after start date"
       }
    } 

    public static priceValidation = {
        required:{ value:true, message:"price!!!"},
        min: {value:100, message: "price is too low"},
        max: {value:10000, message: "price is too high"}  
    }

}

export default VacationsModel

