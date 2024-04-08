import React from 'react'
import './Claim.css'

export default function Claim({keys, date, Currency, Amount, Description, ClaimState, ImageURL}) {
  return (
    <>
    <div className='Inner-Claim-Parent'>    
      <div>
      <b><div>Claim ID: {keys}</div></b>
        <div>{date}</div>
        <span>{Amount  + " "}</span>
        <span>{Currency}</span>
        <div>{Description}</div>
        <span>{ClaimState}</span>
      </div>
        <img src={ImageURL}>  
        </img>
    </div>
    </>
    
  )
}
