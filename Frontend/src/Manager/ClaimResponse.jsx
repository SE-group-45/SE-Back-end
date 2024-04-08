import React from 'react';
import './ClaimResponse.css';
import cross from './assets/cross.png'

export default function ClaimResponse({claimid, claimname, onBlackBoxClick }) {
  return (

      <div className="FormWrapper">
      <div className='meow' onClick={onBlackBoxClick} style={{padding:'20px',width:'50px', height:'50px', position:'absolute', top:0, right:0, display:'flex', justifyContent:'center', alignItems:'center'}}>
      <img src={cross}  style={{width:'20px', height:'20px'}}></img>
      </div>
        <div className="FormContainer">
          <form action="/submit-response" method="POST">
            <h2>Your Response to {claimname} #{claimid}</h2>
            <div className="FormElement">
              <label htmlFor="claimResponse" className="FormLabel">Please Accept or Reject Claim</label>
              <select id="claimResponse" className="FormInput">
                <option value="accept">Accept</option>
                <option value="reject">Reject</option>
              </select>
            </div>
            <div className="FormElement">
              <label htmlFor="explanation" className="FormLabel">Brief Explanation for Claim</label>
              <textarea id="explanation" className="FormInput" placeholder='Type here...' rows="4"></textarea>
            </div>
            <button className="FormButton">Submit</button>
          </form>
        </div>
    </div>
  );
}
