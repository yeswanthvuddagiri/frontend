import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Yeswanth Vuddagiri. All rights reserved.</p>
      <div className="social-icons">
        <a href="mailto:yeswanthvuddagiri20@gmail.com" className="icon email" title="Email">
          <i className="fas fa-envelope"></i>
        </a>
        <a href="https://github.com/yeswanthvuddagiri" target="_blank" rel="noreferrer" className="icon github" title="GitHub">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/yeswanthvuddagiri" target="_blank" rel="noreferrer" className="icon linkedin" title="LinkedIn">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
