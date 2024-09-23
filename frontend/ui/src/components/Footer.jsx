import React from 'react';
import './footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>Green Vibe
            </h2>
            <p>Your partner in sustainable waste management.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p><strong>Email:</strong> contact@ecowaste.com</p>
            <p><strong>Phone:</strong> 011-2368759</p>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 EcoWaste. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;