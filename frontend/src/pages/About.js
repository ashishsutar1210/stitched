import React from 'react';
import { FaTshirt, FaClock, FaSmile, FaStar } from 'react-icons/fa';

function About() {
  return (
    <div className="about-page flashy-about">
      <div className="about-hero">
        <h2>About Our Tailor Business</h2>
        <p className="about-highlight">Crafting confidence, one stitch at a time.</p>
      </div>
      <div className="about-features">
        <div className="feature-card">
          <FaTshirt size={36} color="#6c63ff" />
          <h4>Custom Fit</h4>
          <p>Every piece is tailored to your unique measurements and style.</p>
        </div>
        <div className="feature-card">
          <FaClock size={36} color="#f7b731" />
          <h4>On-Time Delivery</h4>
          <p>We value your time and guarantee timely completion of every order.</p>
        </div>
        <div className="feature-card">
          <FaSmile size={36} color="#20bf6b" />
          <h4>Personal Service</h4>
          <p>Friendly, personalized service from first fitting to final delivery.</p>
        </div>
        <div className="feature-card">
          <FaStar size={36} color="#fd9644" />
          <h4>Quality Materials</h4>
          <p>We use only the best fabrics and threads for lasting comfort and style.</p>
        </div>
      </div>
      <div className="about-footer">
        <p>Visit our Design Gallery to see our latest creations!</p>
      </div>
    </div>
  );
}

export default About; 