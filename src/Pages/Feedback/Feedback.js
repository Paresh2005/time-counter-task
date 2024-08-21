import React, { useState } from 'react';
import feedback1 from "./image/feedbackImage.jpg";
import './Feedback.css';

function Feedback({ handleCategoryClick }) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission logic here
    console.log('Feedback submitted:', feedback);
    // Reset the feedback state after submission if needed
    setFeedback('');
  };

  return (
    <>
      <main>
        {/* hero-image */}
        <div className="row">
          <div className="col">
            <img src={feedback1} alt="panel1" className="img-fluid imageFeedback" />
          </div>
        </div>
        {/* Feedback form */}
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit} className="feedback-form">
              <h3 className="heading">Feedback Form</h3>
              <div className="form-group">
                <label htmlFor="feedbackInput">Your Feedback:</label>
                <textarea
                  id="feedbackInput"
                  className="form-control"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success btn-lg button1">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Feedback;
