class Config{

    public vacationUrl = "http://localhost:3001/api/vacations/"
    public oneVacationUrl = "http://localhost:3001/api/vacation/"
    public vacationImageUrl = "http://localhost:3001/api/vacationsimage/"
    public registerUrl = "http://localhost:3001/api/auth/register/"
    public credentialUrl = "http://localhost:3001/api/auth/login/"
    public followerUrl = "http://localhost:3001/api/followers/"
    public vacationByUserUrl = "http://localhost:3001/api/vacationsByUser/"
    public activeVacationsUrl = "http://localhost:3001/api/activeVacations/"
    public futureVacationUrl = "http://localhost:3001/api/futureVacation/"
    
    

    
}

const appConfig = new Config()
export default appConfig