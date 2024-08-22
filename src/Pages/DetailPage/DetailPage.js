import { useParams, Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useState } from "react";
import { useEffect } from "react";
import "./DetailPage.css";
import PopupButton from "../pop-up Form/popForm";
import Slider from "react-slick";


import {SERVER_BASE_URL} from "../../Util/Base_Url"

function DetailPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const navigate = useNavigate();

  const handleContactClick = () => {
    setShowContactForm(true);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
  };

  const { id, city, category } = useParams();
  const [ngoObject, setNgoObject] = useState({});

  useEffect(() => {
     try{
      fetch(`${SERVER_BASE_URL}/api/ngo/getNgoById/` + id)
      .then((res) => res.json())
      .then((res) =>{
          if(res.success){
            setNgoObject(res.data);
          }else{
            toast.error(res.msg);
          }
  });
     }catch(error){
      toast.error(error.message);
     }
  }, []);

  const handlePrint = () => {
    window.print();
  };
  var pathN;
  if (city == undefined) {
    pathN = "/" + category;
  } else {
    pathN = "/" + category + "/city/" + city;
  }
  var email=ngoObject["Contact Details"]?.["E-mail"] || "N/A";
  email = email.replace("(at)","@");
  email = email.replace("[dot]",".");

  // img scoller settings
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // At 1024px and below
        settings: {
          slidesToShow: 2,  // Show 2 slides
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768, // At 768px and below
        settings: {
          slidesToShow: 1,  // Show 1 slide
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <>
      <div class="container">
        <div class="row ngoDetail">
          <div className="col-8">
            <h4>NGO DETAILS</h4>
          </div>
          <div className="col-2 printIcon">
            <i class="fa-solid fa-print printIcon" onClick={handlePrint}></i>
          </div>
          <div className="col-2 closeIcon">
            <div
              className="btn-close buttonCloseIcon"
              onClick={() => {
                navigate(-1);
              }}
            ></div>  
          </div>
        </div>

        <div class="row">
          <div class="col namePanel">
            <h5>{ngoObject.name}</h5>
          </div>
        </div>
        <table class="table">
          <tr class="idbox">
            <td>
              <p>Unique Id of VO/NGO</p>
            </td>
            <td>
              <p> {ngoObject["Unique Id of VO/NGO"]}</p>
            </td>
          </tr>
        </table>
        <div class="row">
          <div class="col namePane2">
            <h5>Registration Details</h5>
          </div>
        </div>

        <table class="table table-striped table-hover">
          <tbody>
            <tr>
              <td>Registered With </td>
              <td>{ngoObject["Registration Details"]?.["Registered With"] || "N/A"}</td>
            </tr>
            <tr>
              <td>Type of NGO</td>
              <td>{ngoObject["Registration Details"]?.["Type of NGO"] || "N/A"}</td>
            </tr>
            <tr>
              <td>Registration No</td>
              <td>{ngoObject["Registration Details"]?.["Registration No"] || "N/A"}</td>
            </tr>
            <tr>
              <td>Copy of Registration Certificate</td>
              <td>{ngoObject["Registration Details"]?.["Copy of Registration Certificate"] || "N/A"}</td>
            </tr>
            <tr>
              <td>Copy of Pan Card</td>
              <td>{ngoObject["Registration Details"]?.["Copy of Pan Card"] || "N/A"}</td>
            </tr>
            <tr>
              <td>Act name</td>
              <td>{ngoObject["Registration Details"]?.["Act name"] || "N/A"}</td>
            </tr>
            <tr>
              <td>City of Registration </td>
              <td>{ngoObject["Registration Details"]?.["City of Registration"] || "N/A"}</td>
            </tr>
            <tr>
              <td>State of Registration </td>
              <td>{ngoObject["Registration Details"]?.["State of Registration"] || "N/A"}</td>
            </tr>
            <tr>
              <td>Date of Registration</td>
              <td>{ngoObject["Registration Details"]?.["Date of Registration"] || "N/A"}</td>
            </tr>  
          </tbody>
        </table>
        <div class="row">
          <div class="col namePane2">
            <h5>Members</h5>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th className="membersPan">Pan</th>
              <th className="membersAadhar">Aadhaar</th>
            </tr>
            {ngoObject.Members &&
              ngoObject.Members.map((member, index) => (
                <tr key={index}>
                  <td>{member.Name || "N/A"}</td>
                  <td>{member.Designation || "N/A"}</td>
                  <td className="membersPan">{member.Pan || "N/A"}</td>
                  <td className="membersAadhar">{member.Aadhaar || "N/A"}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div class="row">
          <div class="col namePane2">
            <h5>Sector/ Key Issues</h5>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <tbody>
            <tr>
              <td className="keyIssues">Key Issues </td>
              <td>{ngoObject["Key Issues"]?.["Key Issues"] || "N/A"}</td>
            </tr>
            <tr>
              <td className="keyIssues">Operational Area-States</td>
              <td>{ngoObject["Key Issues"]?.["Operational Area-States"] || "N/A"}</td>
            </tr>
            <tr>
              <td className="keyIssues">Operational Area-District</td>
              <td>{ngoObject["Key Issues"]?.["Operational Area-District"] || "N/A"}</td>
            </tr>
          </tbody>
        </table>
        <div class="row">
          <div class="col namePane2">
            <h5>FCRA details</h5>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <tbody>
            <tr>
              <th>FCRA Available</th>
              <th>FCRA Registration no.</th>
            </tr>
            {ngoObject["FCRA details"] &&
              ngoObject["FCRA details"].map((fcra, index) => (
                <tr key={index}>
                  <td>{fcra["FCRA Available"] || "N/A"}</td>
                  <td>{fcra["FCRA Registration no."] || "N/A"}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div class="row">
          <div class="col namePane2">
            <h5>Details of Achievements</h5>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <tbody>
            <tr>
              <td>
                {ngoObject["Details of Achievements"]}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row">
          <div class="col namePane2">
            <h5>Source of Funds</h5>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <tbody>
          {ngoObject["Source of Funds"] &&
              ngoObject["Source of Funds"].map((fund, index) => (
                <tr key={index}>
                  <td>{fund["Department Name"] || "Not Specified"}</td>
                  <td>{fund.Source || "Any Other"}</td>
                  <td>{fund["Finacial Year"] || "N/A"}</td>
                  <td>{fund["Amount Sanctioned"] || "Not Specified"}</td>
                  <td className="purpose">{fund.Purpose || "NOT AVAILABLE"}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div class="row">
          <div class="col namePane2">
            <h5>Contact Details</h5>
          </div>
        </div>
        <table class="table table-striped table-hover ">
          <tbody>
            <tr>
              <td>Address</td>
              <td>{ngoObject["Contact Details"]?.Address || "N/A"}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{ngoObject["Contact Details"]?.City || "N/A"}</td>
            </tr>
            <tr>
              <td>State</td>
              <td>{ngoObject["Contact Details"]?.State || "N/A"}</td>
            </tr>
            <tr>
              <td>Telephone</td>
              <td>{ngoObject["Contact Details"]?.Telephone || "N/A"}</td>
            </tr>

            <tr>
              <td>Mobile No</td>
              <td>{ngoObject["Contact Details"]?.["Mobile No"] || "N/A"}</td>
            </tr>
            <tr>
              <td>Website Url </td>
              <td>
                <a href={ngoObject["Contact Details"]?.["Website Url"] || ""}>{ngoObject["Contact Details"]?.["Website Url"] || "N/A"}</a>
              </td>
            </tr>
            <tr>
              <td>E-mail </td>
              <td className="emailWidth">
                {email}
              </td>
            </tr>
          </tbody>
        </table>

        <Slider {...settings} className="mb-5">
      {ngoObject.photos && ngoObject.photos.map((img, index) => (
        <div key={index}> {/* Bootstrap grid column */}
          <img
            className="img-fluid rounded" // Bootstrap classes for responsive and rounded images
            src={img}
            style={{ height: '30vh', objectFit: 'cover' }}
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </Slider>

        <div class="row buttonDP">
          <div class="col-6 buttonDonate pe-2 ">
            <a href="" class="btn btn-success">
              Donate
            </a>
          </div>
          <div class="col-6 ps-2">
            <button
              onClick={handleContactClick}
              class="btn btn-info buttonContact"
            >
              Contact
            </button>
          </div>
        </div>
        {showContactForm && (
          <div>
            <PopupButton ngoId={ngoObject._id} email={email} onClose={handleCloseContactForm} />
          </div>
        )}
      </div>
    </>
  );
}
export default DetailPage;
