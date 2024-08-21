import React from 'react';
import './Help.css'; // Import the CSS file for styling

const HelpPage = () => {
  return (
    <div className="help-container">
      <h1 className="help-title">Help & Support</h1>
      <hr></hr>
      <section className="help-section">
        <h2 className="help-subtitle">Introduction</h2>
        <p className="help-text">
          Welcome to our Help Page. Here, you can find answers to common questions and get guidance on how to use our portal. If you need further assistance, feel free to contact us.
        </p>
      </section>
      
      <section className="help-section">
        <h2 className="help-subtitle">Frequently Asked Questions (FAQs)</h2>
        <div className="faq">
          <h3 className="faq-question">How can I find the information I need?</h3>
          <p className="faq-answer">Use the search bar at the top of the page or navigate through the menu to find the information you're looking for.</p>
        </div>
        <div className="faq">
          <h3 className="faq-question">Who can I contact for more information?</h3>
          <p className="faq-answer">You can contact us through the information provided on our Contact Us page.</p>
        </div>
        
      </section>
      
      <section className="help-section">
        <h2 className="help-subtitle">Getting Started Guide</h2>
        <p className="help-text">
          If you're new to our portal, here's a quick guide to help you get started:
        </p>
        <ul className="help-list">
          <li>Navigate through the home to explore different NGOs based on category of need.</li>
          <li>Use the search feature to quickly find specific NGOs.</li>
          <li>Connect with NGOs through filling contact form.</li>
          <li>Visit our Contact Us page for detailed contact information.</li>
        </ul>
      </section>
      
      <section className="help-section">
        <h2 className="help-subtitle">Technical Support</h2>
        <p className="help-text">
          For technical support, please email us at uniteup777@gmail.com. Our support team is available Monday to Friday, from 9 AM to 5 PM.
        </p>
      </section>
      
      <section className="help-section">
        <h2 className="help-subtitle">Feedback</h2>
        <p className="help-text">
          We value your feedback. Please let us know if you have any suggestions or if you encounter any issues while using our portal. Your feedback helps us improve our services.
        </p>
      </section>
      
    </div>
  );
};

export default HelpPage;
