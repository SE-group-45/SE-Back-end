import React from 'react';
import { useState, useContext, useEffect} from 'react';
import { UserContext } from "../App.jsx";
import axios from "axios";
import './ViewPendingClaims.css';
import Claim from './Claim.jsx'; 
import expenses from './mock-data.json';
import ClaimResponse from './ClaimResponse.jsx';
import "react-toggle/style.css"


export default function ViewPendingClaims() {
  const user=useContext(UserContext)
  const [page, setPage] = useState();
  const[claim, setclaims] = useState();
  const [submit, setsubmit] = useState(false);

  let claimarr =[]
  useEffect(() => {
    async function fetchData() {
      try {

        const response = await axios.get(`http://localhost:3000/api/financeteamuser/getclaims/${user.token}`);         
        console.log(response.data)
      
        for (const item of response.data) {
          if (item.ClaimState == 'Approved by Manager'){
          claimarr.push(
          <button onClick={() =>handleClaimClick(item._id, item.Description)}>       
          <Claim 
          key={item._id} 
          date={item.createdAt.substring(0, item.createdAt.indexOf('T'))} 
          Amount={item.Amount} 
          Currency={item.Currency} 
          Description={item.Description} 
          ClaimState={item.ClaimState} 
          ImageURL={item.ImagePath}
        />
         </button>)}
        console.log(claimarr)
        setclaims(claimarr)
        }
      } catch (error) { 
        console.error('Error:', error);
      }
    }
    fetchData();
  }, [submit]);

  
  
  const handleBlackBoxClick = () => {
    setPage()
    setsubmit(true)

  }; 

  const handleClaimClick = (claimid, claimname) => {
    setPage(<div>
      
      <ClaimResponse claimid={claimid} claimname={claimname} onBlackBoxClick={handleBlackBoxClick} >
      </ClaimResponse>
      </div>);
  };

  return (
    <div>
      {page}
    <div className='Form-Parent'>
      <h1>Claimants Awaiting Processing</h1>
      <div className='Pending-Claim-Parent'>{claim}</div>
    </div>
    </div>

  );
}
