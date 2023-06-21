

class CredentialModel{
    public email: string
    public password: string


   public static emailValidation = {
        required:{ value:true, message:"email!!!"},
        pattern: {value:  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: "Email must be a valid email"}   
   }
   public static passwordValidation = {
        required:{ value:true, message:"password!!!"},
        min: {value: 8, message: "Password must contain at least 8 characters"},
    } 
}
export default CredentialModel