import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import VacationList from "../../VacationArea/vacationList/vacationList";
import Add from "../../VacationArea/Add/Add";
import VacationUpdate from "../../VacationArea/vacationUpdate/vacationUpdate";
import Update from "../../VacationArea/Update/Update";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Report from "../../VacationArea/Report/Report";
import CsvFile from "../../VacationArea/CsvFile/CsvFile";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
             <Routes>
                <Route path="/" element={<Navigate to={"/login"} />} />
                <Route path="/all-vacations" element={<VacationList />} />
                <Route path="/add" element={<Add />} />
                <Route path="/update/:vacationId" element={<Update />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/csv" element={<CsvFile/>} />
                <Route path="/report" element={<Report/>} />
            </Routes>

			
        </div>
    );
}

export default Routing;
