import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Navbar.css';

class Navbar extends Component {
  handleHowToClick = () => {
    alert("Here is how you can use the Currency Converter:\n1. Enter the amount you want to convert.\n2. Select the currency you are converting from.\n3. Select the currency you are converting to.\n4. Click 'Convert' to see the result.");
  };

  handleAboutClick = () => {
    alert("Currency Converter App\nVersion 1.0\nDeveloped by Thomas Andersen.");
  };

  handleContactClick = () => {
    alert("Contact Us:\nEmail: contact@example.com\nPhone: +1234567890");
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Currency Converter</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end custom-offcanvas" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/rates">Table of Rates</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.handleHowToClick}>How To</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.handleAboutClick}>About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.handleContactClick}>Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
