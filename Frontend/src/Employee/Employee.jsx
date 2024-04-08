import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { UserContext } from "../App.jsx";
import ProfilePic from './assets/profile.jpg';
import Search from './assets/search.png';
import Plus from './assets/plus.svg';
import Previous from './assets/Previous.svg';
import './App.css'
import Form from './Form';
import PreviousClaims from './PreviousClaims';

// on each page it needs to check the context and see if it matches the component
// every time the api call is made the context needs to be added to the URL
function Employee(){
    // here is the user details used for all api  calls
    const user=useContext(UserContext)
    const [page, setPage] = useState(<Form></Form>) 

    
    return(
            <>
            <div className='Content-Header'>
              <div className='Side-Panel'>
                <div className='Profile-Info '>
                  <img className='Profile-Pic'src={ProfilePic}></img>
                  <h2>{user.name}</h2>
                  <h3>FDM Employee</h3>
                </div>
                <div className='Options-Container'>
                  <div className='Claim-Parent' onClick={()=>setPage(<Form token={user.token}></Form>)}>
                    <div>SUBMIT CLAIM</div>
                    <img className='Plus-Icon'src={Plus}></img>
                  </div>
                  <div className='Claim-Parent' onClick={()=>setPage(<PreviousClaims></PreviousClaims>)}>
                    <div>PREVIOUS CLAIMS</div>
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

export default Employee;
