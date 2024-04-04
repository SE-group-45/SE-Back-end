import React from "react";
import "./style.css";

function TopNav() {
  return (
    <>
      <header className="header ">
        <div className="headerLeft" bis_skin_checked="1">
          <h1>
            <a className="fw-bolder" href="/#">
              Expensify
            </a>
          </h1> 
        </div>
        <div className="headerRight" bis_skin_checked="1">
          <h4>
            <a className="fw-bolder" href="/team">
              Our Team
            </a>
          </h4>
          <h4>
            <a className="fw-bolder" href="/services">
              Services
            </a>
          </h4>
          <h4>
            <a className="fw-bolder" href="/contact">
              Contact
            </a>
          </h4>
        </div>
        <div className="hamburgerMenu" bis_skin_checked="1">
          <div className="hamburgerMenu" bis_skin_checked="1">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </header>
      <div
        className="signinSection "
        style={{ fontFamily: "Termina" }}
        bis_skin_checked="1"
      >
        <h1>Welcome back!</h1>
        <p>
          don't have an account?
          <a className="signupLink mx-2" href="/signup">
            Sign up
          </a>
        </p>
      </div>
    </>
  );
}

export default TopNav;
