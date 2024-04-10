import React, { useState, useContext} from 'react';
import './ClaimResponse.css';
import { UserContext } from "../App.jsx";
import axios from "axios";
import cross from './assets/cross.png';

export default function ClaimResponse({ claimid, claimname, onBlackBoxClick, imageURL}) {

  console.log(imageURL)

  const user=useContext(UserContext)
  console.log(user.token)
  const [claimResponse, setClaimResponse] = useState('accept');
  const [explanation, setExplanation] = useState('');

  const handleClaimResponseChange = (event) => {
    setClaimResponse(event.target.value);
  };

  const handleExplanationChange = (event) => {
    setExplanation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (claimResponse == 'accept'){
      console.log("Claim has been accpeted")
      acceptclaim(claimid, explanation);
    }
    else if (claimResponse == 'reject'){
      console.log("Claim has been accpeted")
      rejectclaim(claimid, explanation)
    }

    console.log('Claim Response:', claimResponse);
    console.log('Explanation:', explanation);
  };

  async function rejectclaim(id, reason){
    try {
      const response = await axios.put(`http://localhost:3000/api/manager/RejectClaim/${user.token}/${claimid}`,{comments:reason});                
      console.log(response.data)
      onBlackBoxClick()
    } catch (error) { 
      console.error('Error:', error);
    }
  }

  async function acceptclaim(id, reason){
    try {
      const response = await axios.put(`http://localhost:3000/api/manager/ApproveClaim/${user.token}/${claimid}`,{comments:reason});                  
      console.log(response.data)
      onBlackBoxClick()
    } catch (error) { 
      console.error('Error:', error);
    }
  }


const handleBlackBoxClick = () => {
  setPage()
};

  

  return (
    <div className="FormWrapper">
      <div className='meow' onClick={onBlackBoxClick} style={{ padding: '20px', width: '50px', height: '50px', position: 'absolute', top: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={cross} style={{ width: '20px', height: '20px' }} alt="Cross" />
      </div>
      <div className="FormContainer">
        <form onSubmit={handleSubmit} action="/submit-response" method="POST">
          <h2>Your Response to #{claimid}</h2>
          <br></br>
          <h3>Claim Image</h3>
          <br></br>
          <img src={imageURL}></img>
          <h3>Claim Description</h3>
          <p>{claimname}</p>
          <br></br>
          <div className="FormElement">
            <label htmlFor="claimResponse" className="FormLabel">Please Accept or Reject Claim</label>
            <select id="claimResponse" className="FormInput" value={claimResponse} onChange={handleClaimResponseChange}>
              <option value="accept">Accept</option>
              <option value="reject">Reject</option>
            </select>
          </div>
          <div className="FormElement">
            <label htmlFor="explanation" className="FormLabel">Additonal Comments</label>
            <textarea id="explanation" className="FormInput" placeholder='Type here...' rows="4" value={explanation} onChange={handleExplanationChange}></textarea>
          </div>
          <button type="submit" className="FormButton">Submit</button>
        </form>
      </div>
    </div>
    
  );
}


