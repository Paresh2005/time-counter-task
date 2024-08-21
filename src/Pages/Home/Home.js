import { Link } from "react-router-dom";
import panel from "./image/panel.png";
import "./Home.css";
import { useState } from "react";
function Home({ handleCategoryClick }) {

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };


  return (
    <>
      <main>
        {/* hero-image */}
        <div class="row">
          <div class="col">
            <img src={panel} alt="panel" class="img-fluid image" />
          </div>
        </div>
        {/* description */}
        <h3 class="heading">Who are we?</h3>
        <div class="row">
          <div class="col text">
          <p>
              "Welcome to <b>Unite Up</b>, your platform for fostering
              connections between NGOs and individuals in need within our
              community. Our website serves as a bridge, empowering NGOs to
              extend their reach and support to those facing hardships, while
              providing a centralized hub for individuals seeking assistance.
              <br />
              <br />
              Start by searching for NGOs based on your category of need and city. <b>Simply fill out a brief form detailing your requirements, and your information will be directly emailed to the appropriate NGO.</b> This easy and efficient process ensures that those in need can quickly access the assistance they require from dedicated organizations.
              <br />
              <br />
              Join our community today to make a meaningful impact and create
              positive change in the lives of those less privileged. Together,
              we can build a stronger, more compassionate society where everyone
              has the opportunity to thrive."
            </p>
          </div>
        </div>

        {/* <!-- How It Work --> */}

        <h3 className="unique-heading">How It Works</h3>
        <div className="unique-icon-section">
          <div className="unique-icon-container">
            <div className="unique-icon">
              <i className="fas fa-user"></i>
              <p>User Fills Form</p>
            </div>
            <div className="unique-line"></div>
            <div className="unique-icon">
              <i className="fas fa-envelope"></i>
              <p>Form Data Sent via Email</p>
            </div>
            <div className="unique-line"></div>
            <div className="unique-icon">
              <i className="fas fa-hand-holding-heart"></i>
              <p>NGO Receives Data</p>
            </div>
          </div>
        </div>
        {/* banner */}
        <div class="row">
          <div class="col ">
            <div class="banner">
              <button class="btn btn-success btn-lg button1">Donate Now</button>
            </div>
          </div>
        </div>
        <div class="row">
          <h4 class="heading3">
            India's most trusted online donation platform*
          </h4>
          <div class="col info">
            <i class="fa-solid fa-rocket"></i>
            <h5>Easy</h5>
            <p className="iconDes">Donate quickly and seamlessly</p>
          </div>
          <div class="col info">
            <i class="fa-solid fa-bolt"></i>
            <h5>Impactful</h5>
            <p className="iconDes">Connect with NGO through Email via forms</p>
          </div>
          <div class="col info">
            <i class="fa-solid fa-medal"></i>
            <h5>Credible</h5>
            <p className="iconDes">
              {" "}
              Support 3,000+ certified Indian nonprofits
            </p>
          </div>
        </div>
        {/* card */}
        <h3 class="heading mb-5">Type of Charity</h3>
        <div class="Container-fluid">
          <div class="row justify-content-evenly  ">
            <div class="col-md-3 card card1 mb-5 pb-5" id="box1">
              <Link
                to="/education"
                onClick={() => handleCategoryClick("education")}
              >
                <div class="box-content">
                  <i class="fa-solid fa-school"></i>
                  <h4>Education</h4>
                </div>
              </Link>
            </div>
            <div class="col-md-3 card card1 mb-5 pb-5" id="box2">
              <Link to="/food" onClick={() => handleCategoryClick("food")}>
                <div class="box-content">
                  <i class="fa-solid fa-burger"></i>
                  <a href="">
                    <h4>Food</h4>
                  </a>
                </div>
              </Link>
            </div>
            <div class="col-md-3 card card1  mb-5 pb-5" id="box3">
              <Link
                to="/environment"
                onClick={() => handleCategoryClick("environment")}
              >
                <div class="box-content">
                  <i class="fa-solid fa-tree-city"></i>
                  <a href="">
                    <h4>Environment</h4>
                  </a>
                </div>
              </Link>
            </div>
          </div>
          <div class="row justify-content-evenly  ">
            <div class="col-md-3 card card1 mb-5 pb-5" id="box4">
              <Link
                to="/Agriculture"
                onClick={() => handleCategoryClick("Agriculture")}
              >
                <div class="box-content">
                  <i class="fa-solid fa-building-wheat"></i>
                  <a href="">
                    <h4>Agriculture</h4>
                  </a>
                </div>
              </Link>
            </div>
            <div class="col-md-3 card card1 mb-5 pb-5" id="box5">
              <Link
                to="/Children"
                onClick={() => handleCategoryClick("Children")}
              >
                <div class="box-content">
                  <i class="fa-solid fa-child-reaching"></i>
                  <a href="">
                    <h4>Children</h4>
                  </a>
                </div>
              </Link>
            </div>
            <div class="col-md-3 card card1 mb-5 pb-5" id="box6">
              <Link
                to="/Labour & Employment"
                onClick={() => handleCategoryClick("Labour & Employment")}
              >
                <div class="box-content">
                  <i class="fa-solid fa-person-digging"></i>
                  <a href="">
                    <h4>Labour & Employment</h4>
                  </a>
                </div>
              </Link>
            </div>
          </div>
          <div class="row justify-content-evenly  ">
            <div class="col-md-3 card card1 mb-5 pb-5" id="box7">
              <Link
                to="/Tribal Affairs"
                onClick={() => handleCategoryClick("Tribal Affairs")}
              >
                <div class="box-content">
                  <i class="fa-solid fa-tree"></i>
                  <a href="">
                    <h4>Tribal Affairs</h4>
                  </a>
                </div>
              </Link>
            </div>
            <div class="col-md-3 card card1 mb-5 pb-5" id="box8">
              <Link
                to="/Women's Development"
                onClick={() => handleCategoryClick("Women's Development")}
              >
                <div class="box-content">
                  <i class="fa-solid fa-tree"></i>
                  <a href="">
                    <h4>Women's Development</h4>
                  </a>
                </div>
              </Link>
            </div>
            <div class="col-md-3 card card1 mb-5 pb-5 " id="box9">
              <Link
                to="/Legal Awareness"
                onClick={() => handleCategoryClick("Legal Awareness")}
              >
                <div class="box-content">
                  <i class="fa-solid fa-scale-balanced"></i>
                  <a href="">
                    <h4>Legal Awareness</h4>
                  </a>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
