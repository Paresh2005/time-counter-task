import { Link,Outlet } from "react-router-dom";
import "./HomeLayout.css"
import LoginPanel from "../Pages/Header/LoginPanel";
import Navbar from "../Pages/Header/Navbar";
import FooterLink from "../Pages/Footer/FooterLink";
import FooterPanel from "../Pages/Footer/FooterPanel";
import Education from "../Pages/NgosList/NgosList";

function HomeLayout(){
    return(
        <>
            <div className="container-fluid containerCss2">
                <LoginPanel/>
                <Navbar/>
                <Outlet/>
                <FooterLink/>
                <FooterPanel/>
            </div>
        </>
    )
}
export default HomeLayout;