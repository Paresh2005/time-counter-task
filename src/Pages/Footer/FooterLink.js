import { Link } from "react-router-dom";
import "./FooterLink.css"

function FooterLink(){
    return(
        <>
            <div class="row footer-1">
                <div class="col">
                    <Link to="/websitePolicy" className="line">Website Policy</Link>
                    <Link to="/sitemap" className="line">Site Map</Link>
                    <Link to="/feedback" className="line">Feedback</Link>
                    <Link to="/contact" className="line">Contact-Us</Link>
                    <Link to="/help">Help</Link>
                </div>
            </div>        
        </>
    )
}

export default FooterLink;