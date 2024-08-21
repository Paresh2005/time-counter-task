import { Link,Outlet } from "react-router-dom";
function HomeLayout(){
    return(
        <>
            <div className="container-fluid containerCss2">
                {/* navbar */}
                <nav className="navbar navbar-expand-lg bg-body-tertiary navNgo">
                    <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand navFont" href="#">
                        Unite-Up
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/ngopage"} className="nav-link active" aria-current="page" href="#">
                            Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            Setting
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            Updates
                            </a>
                        </li>
                        </ul>
                        <span className="navbar-text">
                        <div className=""></div>
                        </span>
                    </div>
                    </div>
                 </nav>
                <Outlet/>
            </div>
        </>
    )
}
export default HomeLayout;