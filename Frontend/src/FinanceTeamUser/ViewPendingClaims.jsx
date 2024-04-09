import React from 'react';
import { useState, useContext,useEffect} from 'react';
import { UserContext } from "../App.jsx";
import './ViewPendingClaims.css';
import Claim from './Claim.jsx'; 
import expenses from './mock-data.json';
import ClaimResponse from './ClaimResponse.jsx';
import "react-toggle/style.css"

export default function ViewPendingClaims() {
  const claimarr = [];
  const user=useContext(UserContext)
  const [page, setPage] = useState();

  const [AllClaims,setAllClaims] = useState();
  const [ChosenClaim,setChosenClaim] = useState();


  async function GetAllClaims(){
    try {
      const result = await axios.get(`http://localhost:3000/api/financeteamuser/getclaims/${user.token}`);
      setAllClaims(result.data);
      
    } catch (error) {
      console.error('Error fetching all users:', error);
      // Deal with error
      // Make alert to display error
      // Logout and redirect to login
    }
  }


  useEffect(()=>{
    GetAllClaims();
  },[])


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
<>
{
  (GetAllClaims.length !==0)&&(
    


  )
}
  <div>
      {page}
    <div className='Form-Parent'>
      <h1>Claimants Awaiting Processing</h1>
      <div className='Pending-Claim-Parent'>{claimarr}</div>
    </div>
    </div>
</>
  );
}
