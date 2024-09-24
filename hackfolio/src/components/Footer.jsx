import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footer-links">
        <div className="slogan">
        <h2>Fueling <span className="highlight-green">innovation</span> by enabling the <span className="highlight-purple">builders</span> of tomorrow.</h2>
        </div>
          <div>
            <h3><b>Community</b></h3>
            <ul>
              <li><a href="#">Organize a hackathon</a></li>
              <li><a href="#">Explore hackathons</a></li>
              <li><a href="#">Code of Conduct</a></li>
              <li><a href="#">Brand Assets</a></li>
            </ul>
          </div>
          <div>
            <h3><b>Company</b></h3>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Changelog</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
          <div>
            <h3><b>Support</b></h3>
            <ul>
              <li><a href="#">Help</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Status</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
