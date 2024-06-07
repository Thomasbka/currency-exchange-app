import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="footer" align-items="end">
        <div className="logos d-flex text-left">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github mx-2"></i>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        <p>All rights reserved by Thomas Andersen</p>
      </div>
    );
  }
}

export default Footer;
