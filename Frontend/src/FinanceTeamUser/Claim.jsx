import React from 'react';
import { useState } from 'react';
import './Claim.css';
import './ClaimSmall.css';
import ClaimResponse from './ClaimResponse';

export default function Claim({id,name, date, cost, status, small}) {
  const claimClass = small ? 'small-claim' : 'Inner-Claim-Parent';
  const handlemodal = () => {
    setPage(<ClaimResponse></ClaimResponse>)
  }

  const [page, setPage] = useState();

  return (
    
    <div onClick={handlemodal} className={claimClass}>
      <h3>#{id}</h3>
      <h2>{name}</h2>
      <div>{date}</div>
      <div>£{cost}</div>
      <span>{status}</span>
    

    </div>
  );
}
