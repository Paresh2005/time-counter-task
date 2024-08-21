import React from 'react';
import './WebsitePolicy.css'; // Import the CSS file for styling

const PolicyPage = () => {
  return (
    <div className="policy-container">
      <h1 className="policy-title">Website Policy</h1>
      <hr></hr>
      <section className="policy-section">
        <h2 className="policy-subtitle">Data Collection</h2>
        <p className="policy-text">
          All data displayed on this website is scraped from official government websites. We ensure the accuracy and authenticity of the data, but we are not responsible for any discrepancies that may arise.
        </p>
      </section>
      <section className="policy-section">
        <h2 className="policy-subtitle">Contact Form</h2>
        <p className="policy-text">
          Information filled in the contact form is submitted directly to the respective NGO's email address. We do not store any personal information provided through the contact form.
        </p>
      </section>
      <section className="policy-section">
        <h2 className="policy-subtitle">Payments</h2>
        <p className="policy-text">
          There are no payment options available on this portal. Any requests for payments should be considered fraudulent and reported to the site administrators immediately.
        </p>
      </section>
      <section className="policy-section">
        <h2 className="policy-subtitle">NGO Details</h2>
        <p className="policy-text">
          The details of the NGOs listed on this portal are provided for informational purposes only. We do not endorse or verify the authenticity of any NGO listed.
        </p>
      </section>
      <section className="policy-section">
        <h2 className="policy-subtitle">Disclaimer</h2>
        <p className="policy-text">
          This website is a resource for information and does not provide any guarantees regarding the accuracy, completeness, or reliability of the information. Users are advised to verify any information before taking action.
        </p>
      </section>
    </div>
  );
};

export default PolicyPage;
