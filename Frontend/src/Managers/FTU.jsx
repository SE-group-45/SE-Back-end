import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { UserContext } from "../App.jsx";
import ProfilePic from './assets/johnny.png';
import Search from './assets/search.png';
import Plus from './assets/plus.svg';
import Previous from './assets/Previous.svg';
import ClaimResponse from './ClaimResponse.jsx';
import './ClaimProcessing.css';
import AccountManagement from './AccountManagement.js';
import CurrentClaims from './CurrentClaims.js';
import PreviousClaims from './PreviousClaims.jsx';
import ViewPendingClaims from './ViewPendingClaims.jsx'; 

// on each page it needs to check the context and see if it matches the component
// every time the api call is made the context needs to be added to the URL
function FTU(){
    const [page, setPage] = useState(<ViewPendingClaims />);
    // here is the user details used for all api  calls
    const user=useContext(UserContext);

    return(
        <>
        <div className='Content-Header' >
          <div className='Side-Panel'>
            <div className='Profile-Info'>
              <img className='Profile-Pic' src={ProfilePic} alt="Profile"></img>
              <h2>John Smith</h2>
              <h3>Line Manager</h3>
            </div>
            <div className='Options-Container'>
              <div className='Claim-Parent' onClick={() => setPage(<ViewPendingClaims />)}> 
                <div>View Pending Claims</div>
                <img className='Search-Icon' src={Search} alt="Search"></img>
              </div>
              <div className='Claim-Parent' onClick={() => setPage(<PreviousClaims/>)}>
                <div>View Past claims</div>
                <img className='Previous-Icon' src={Previous} alt="Previous"></img>
              </div>
            </div>
          </div>
          <div className='Form-Parent'>
            {page}
          </div>
        </div>
      </>
    )
}

export default FTU;
