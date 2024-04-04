import React from 'react'
import './Claim.css'

export default function Claim({name, date, cost, status}) {
  return (
    <>
    <div className='Inner-Claim-Parent'>
    <h2>{name}</h2>
    <div>{date}</div>
    <div>£{cost}</div>
    <span>{status}</span>
    </div>
    </>
    
  )
}
