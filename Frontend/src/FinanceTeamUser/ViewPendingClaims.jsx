import React from 'react';
import { useState } from 'react';
import './ViewPendingClaims.css';
import Claim from './Claim.jsx'; 
import expenses from './mock-data.json';
import ClaimResponse from './ClaimResponse.jsx';

export default function ViewPendingClaims() {
  const claimarr = [];

  const [page, setPage] = useState();

  
  const handleBlackBoxClick = () => {
    setPage()
  };

  const handleClaimClick = (claimid, claimname) => {
    setPage(<div>
  
      <ClaimResponse claimid={claimid} claimname={claimname}onBlackBoxClick={handleBlackBoxClick} >
      </ClaimResponse>
      </div>);
  };

  for (let i = 0; i < expenses.expenses.length; i++) {
    if (expenses.expenses[i].status === 'Unapproved') {
      claimarr.push(
        <button onClick={() => handleClaimClick(expenses.expenses[i].code, expenses.expenses[i].name )}>       
          <Claim key={i}
          id={expenses.expenses[i].code}
            name={expenses.expenses[i].name}
            date={expenses.expenses[i].date_sent}
            cost={expenses.expenses[i].amount}
            status={expenses.expenses[i].status}
            small={true}
          >
          </Claim>
         
        </button>
      );
    }
  }

  return (
    <div>
      {page}
    <div className='Form-Parent'>
      <h1>Claimants Awaiting Processing</h1>
      <div className='Pending-Claim-Parent'>{claimarr}</div>
    </div>
    </div>

  );
}
