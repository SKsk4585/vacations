import RoleModel from "./roleModel"

class UserModel{
    public userId: number  
    public firstName: string
    public lastName: string
    public email: string
    public password: string
    public role: RoleModel

    public static firtNameValidation = {
        required:{ value:true, message:"firs name!!!"},
        minlength: {value:5, message:"name is too short"},
        maxlength: {value:30, message:"name is too long"}
   }
   
   public static lastNameValidation = {
        required:{ value:true, message:"last name!!!"},
        minlength: {value:5, message:"name is too short"},
        maxlength: {value:30, message:"name is too long"}
   }
   public static emailValidation = {
        required:{ value:true, message:"email!!!"},
        pattern: {value:  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: "Email must be a valid email"}   
   }
   public static passwordValidation = {
        required:{ value:true, message:"password!!!"},
        min: {value: 8, message: "Password must contain at least 8 characters"},
    } 
}
export default UserModel