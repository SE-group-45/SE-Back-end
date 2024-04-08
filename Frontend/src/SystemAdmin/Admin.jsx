import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { UserContext } from "../App.jsx";
import ProfilePic from './assets/hum.jpg';
import Search from './assets/search.png';
import Plus from './assets/plus.svg';
import Previous from './assets/Previous.svg';
import CreateAccount from './createAccount';
import './systemAdmin.css';
import AccountManagement from './AccountManagement';

import PreviousClaims from './PreviousClaims';
// on each page it needs to check the context and see if it matches the component
// every time the api call is made the context needs to be added to the URL
function Admin(){
    // here is the user details used for all api  calls
    const user=useContext(UserContext);
    const [page, setPage] = useState(<CreateAccount></CreateAccount>) 

    return(
        <>
    <div className='Content-Header'>
      <div className='Side-Panel'>
        <div className='Profile-Info '>
          <img className='Profile-Pic'src={ProfilePic}></img>
          {/* change to user name and account type */}
          <h2>Humayun Amin</h2>
          <h3>System Admin</h3>
        </div>
        <div className='Options-Container'>
          <div className='Claim-Parent' onClick={()=>setPage(<CreateAccount />)}>
            <div>Create account</div>
            <img className='Plus-Icon'src={Plus}></img>
          </div>
          <div className='Claim-Parent' onClick={()=>setPage(<AccountManagement />)}>
            <div> Account management</div>
            <img className='Search-Icon'src={Search}></img>
          </div>
          <div className='Claim-Parent' onClick={()=>setPage(<PreviousClaims />)}>
            <div>View claims</div>
            <img className='Previous-Icon'src={Previous} ></img>
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

export default Admin;
