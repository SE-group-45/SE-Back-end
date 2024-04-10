import React from "react";
import "./navstyle.css";
import fdmlogo from '../public/FDM.png';
import './style.css'

function TopNav() {
  return (
    <>
      <header className="header">
        <div className="LogoWrappers">     
          <img className='logoimg' src={fdmlogo}></img><h1>x Expensify</h1>
          <div className="headerLeft" bis_skin_checked="1">   
        </div>
         
           
        </div>
        <div className="headerRight" bis_skin_checked="1">
          <h4>
            <a className="fw-bolder">
              Our Team
            </a>
          </h4>
          <h4>
            <a className="fw-bolder">
              Services
            </a>
          </h4>
          <h4>
            <a className="fw-bolder">
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
    </>
  );
}

export default TopNav;
