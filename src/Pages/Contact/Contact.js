// About.js
import React from "react";
import contact from "./image/image2.jpg";
import "./Contact.css"; // Import your CSS file with styles for the About component

function Contact() {
  return (
    <div className="Container about-container">
      <img
        src={contact}
        alt="Contact-us"
        className="img-fluid contactImage"
      ></img>

      <div className="row">
        <div className="col-md-6 contact-section ">
          <h2 className="bg-dark-subtle">
            Contact Us
          </h2>
          <p>Email: hatimmerchant777@gmail.com</p>
          <p>Phone: +91 9033863909</p>
        </div>
        <div className="col-md-6 connect-section">
          <h2 className="bg-dark-subtle">Connect with Us</h2>
          <p>
            Facebook:{" "}
            <a href="https://www.facebook.com/example">Example Facebook</a>
          </p>
          <p>
            Twitter: <a href="https://twitter.com/example">Example Twitter</a>
          </p>
          {/* Add other social media links */}
        </div>
      </div>
      <h2 className="bg-dark-subtle text-center">Map</h2>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1600.9044253176992!2d70.80646693004273!3d22.30000830567369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cbcc0a28b431%3A0x83e92fee4d72ad05!2sRaiyanaka%20Tower!5e0!3m2!1sen!2sin!4v1710845714232!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="map "></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
