import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import VacationList from "../../VacationArea/vacationList/vacationList";
import Add from "../../VacationArea/Add/Add";
import VacationUpdate from "../../VacationArea/vacationUpdate/vacationUpdate";
import Update from "../../VacationArea/Update/Update";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
             <Routes>
                <Route path="/" element={<Navigate to={"/all-vacations"} />} />
                <Route path="/all-vacations" element={<VacationList />} />
                <Route path="/add" element={<Add />} />
                <Route path="/update" element={<Update />} />
            </Routes>

			
        </div>
    );
}

export default Routing;
