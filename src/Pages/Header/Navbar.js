import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar(){
    return(
        <>
        <div class="row navbarCss2">
            <div class="col colCss">
                {/* navbar */}
                <ul class="nav justify-content-center navbar">
                    <li class="nav-item">
                      <Link class="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to="/about">About</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to="/contact">Contact-Us</Link>
                    </li>
                  </ul>
            </div>
        </div>           
        </>
    )
}

export default Navbar;