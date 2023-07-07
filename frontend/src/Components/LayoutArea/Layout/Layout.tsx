import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Menu from "../Menu/Menu";
import "./Layout.css";
import authService from "../../../services/authService";
import { useNavigate } from "react-router-dom";

function Layout(): JSX.Element {


    return (
        <div className="Layout">
            <header>
                <Header/>
            </header>



            <main>
                <Main/>
            </main>
            
            {/* <footer>
                <Footer/>
            </footer>
			 */}
        </div>
    );
}

export default Layout;
