import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <NavLink to= "/get-all-vacations"></NavLink>

			
        </div>
    );
}

export default Menu;
