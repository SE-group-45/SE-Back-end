import React, {useState, useContext, useEffect} from 'react'
import './PreviousClaims.css'
import expenses from './mock-data.json'
import { UserContext } from "../App.jsx";
import Claim from './Claim'
import axios from "axios";


export default function PreviousClaims() {

  const user=useContext(UserContext)

  const [claimlist, setclaimlist] = useState([])

  useEffect(() => {
    async function fetchData() {
      console.log("meow");
      try {
        const response = await axios.get(`http://localhost:3000/api/employee/${user.token}`);
        
        // Map over the response data and create Claim components
        const claims = response.data.map(item => ( 
      
      
          <Claim keys={item._id} date={item.createdAt.substring(0, item.createdAt.indexOf('T'))} Amount={item.Amount} Currency={item.Currency} Description={item.Description} ClaimState={item.ClaimState} ImageURL={item.ImagePath}/>
        ));
        setclaimlist(claims);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    fetchData();
  }, []);
  

  return (
    <>
    <h2>Historic Claims</h2>
    <div className='Claims-Parent'>
  {claimlist}
    </div>
    </>
  )
}
