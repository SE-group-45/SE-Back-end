import React, {useState, useContext, useEffect} from 'react'
import './PreviousClaims.css'
import expenses from './mock-data.json'
import { UserContext } from "../App.jsx";
import Claim from './Claim'
import axios from "axios";
import "react-toggle/style.css"
import Toggle from 'react-toggle'

export default function PreviousClaims() {

  const user=useContext(UserContext)

  const [claimlist, setclaimlist] = useState([])

  const [approvedclaimlist, setapprovedclaimlist] = useState([])

  const [toggle, settoggle] = useState(true)

  const [display, setdisplay] = useState()




  useEffect(() => {
    async function fetchData() {
      console.log("meow");
      try {
        const response = await axios.get(`http://localhost:3000/api/employee/${user.token}`);
       
        let temparr = [];
        let tempapprovedarr = []

        for (const item of response.data) {
          if (item.ClaimState == "Pending"|| item.ClaimState == "Approved by Manager"){
          temparr.push(
            <Claim 
              key={item._id} 
              date={item.createdAt.substring(0, item.createdAt.indexOf('T'))} 
              Amount={item.Amount} 
              Currency={item.Currency} 
              Description={item.Description} 
              ClaimState={item.ClaimState} 
              ImageURL={item.ImagePath}
            />
          );
        }
        else{
          tempapprovedarr.push(
            <Claim 
              key={item._id} 
              date={item.createdAt.substring(0, item.createdAt.indexOf('T'))} 
              Amount={item.Amount} 
              Currency={item.Currency} 
              Description={item.Description} 
              ClaimState={item.ClaimState} 
              ImageURL={item.ImagePath}
              Reason={item.Comments}
            />
          );
        }
        }
        
        setclaimlist(temparr);
        setapprovedclaimlist(tempapprovedarr)

      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    fetchData();
  }, []);
  

  return (
    <>
    <h2>Historic Claims</h2>
    <div>
    {/* <Toggle
  defaultChecked={true} 
  onChange={()=>{settoggle(!toggle)}} /> */}
</div>  
    <div className='Claims-Parent'>
      <b>Note: A claim will only be reimbursed if its state is <e>'Approved by FTU'</e></b>
    <div>Pending Claims</div>
    {claimlist}
    <div>Previous  Claims</div>
    {approvedclaimlist}
    </div>
    </>
  )
}
