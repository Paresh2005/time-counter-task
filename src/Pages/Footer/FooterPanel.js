import logo from "./image/logo.png"
import "./FooterPanel.css"

function FooterPanel(){
    return(
        <>
            <div class="row footer-2">
                <div class="col footer-content">
                    <img src={logo} alt="logo"/>
                    <p><b>Develop by Darshan University Student</b></p>
                </div>
            </div>
        </>
    )
}

export default FooterPanel;