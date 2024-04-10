import React from 'react'
import './Claim.css'

export default function Claim({key, name,date, Currency, Amount, Description, ClaimState, ImageURL, Reason}) {
  return (
    <>
    <div className='Inner-Claim-Parent'>    
      <div>
        <div>Claim holder name: <b>{key}{name} </b></div>
        <div><b>Result: </b>{ClaimState}</div>
        <div><b>Date: </b>{date}</div>
        <span>Amount: {Amount  + " "}</span>
        <span>{Currency}</span>
        <div>employee Description:{Description}</div>
        
        <br></br>
        <b><span>Claim Comments: </span></b><br></br>
        <span>{Reason}</span>
      </div>
        <img src={ImageURL}>  
        </img>
    </div>
    </>
    
  )
}
