import React from 'react';
import { Link } from 'react-router-dom';
import './SiteMap.css';

const SiteMap = () => {
  return (
    <div className="site-map-container">
      <h1 className="site-map-header">Site Map</h1>
      
      <div className="site-map-section">
        <h2 className="site-map-section-title">Main Pages</h2>
        <ul className="site-map-list">
          <li className="site-map-list-item">
            <Link to="/" className="site-map-link">
              <span className="site-map-icon">&#127968;</span> Home
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/about" className="site-map-link">
              <span className="site-map-icon">&#8505;</span> About Us
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/contact" className="site-map-link">
              <span className="site-map-icon">&#9993;</span> Contact Us
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/websitePolicy" className="site-map-link">
              <span className="site-map-icon">&#128274;</span> Policy
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/help" className="site-map-link">
              <span className="site-map-icon">&#128712;</span> Help
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="site-map-section">
        <h2 className="site-map-section-title">NGO Related</h2>
        <ul className="site-map-list">
          <li className="site-map-list-item">
            <Link to="/rform" className="site-map-link">
              <span className="site-map-icon">&#128221;</span> NGO Registration Form
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/loginNgo" className="site-map-link">
              <span className="site-map-icon">&#128274;</span> NGO Login
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/ngopage" className="site-map-link">
              <span className="site-map-icon">&#127968;</span> NGO Home
            </Link>
          </li>
        </ul>
      </div>

      <div className="site-map-section">
        <h2 className="site-map-section-title">Category Pages</h2>
        <ul className="site-map-list">
          <li className="site-map-list-item">
            <Link to="/education" className="site-map-link">
              <span className="site-map-icon">&#127891;</span> Education
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/food" className="site-map-link">
              <span className="site-map-icon">&#127828;</span> Food
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/health" className="site-map-link">
              <span className="site-map-icon">&#127973;</span> Health
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/environment" className="site-map-link">
              <span className="site-map-icon">&#127795;</span> Environment
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/agriculture" className="site-map-link">
              <span className="site-map-icon">&#127806;</span> Agriculture 
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/children" className="site-map-link">
              <span className="site-map-icon">&#128118;</span> Children
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/labour" className="site-map-link">
              <span className="site-map-icon">&#128188;</span> Labour and Employment
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/tribal" className="site-map-link">
              <span className="site-map-icon">&#127806;</span> Tribal Affairs
            </Link>
          </li>
          <li className="site-map-list-item">
            <Link to="/women" className="site-map-link">
              <span className="site-map-icon">&#128105;</span> Women Development
            </Link>
          </li>  
          <li className="site-map-list-item">
            <Link to="/Legal Awareness" className="site-map-link">
              <span className="site-map-icon">&#9878;</span> Legal Awareness
            </Link>
          </li> 
        </ul>
      </div>
    </div>
  );
}

export default SiteMap;
