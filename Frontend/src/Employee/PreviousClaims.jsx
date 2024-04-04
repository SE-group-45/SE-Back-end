import React from 'react'
import './PreviousClaims.css'
import expenses from './mock-data.json'
import Claim from './Claim'

export default function PreviousClaims() {

    let claimarr = []
    for (let i = 0; i < expenses.expenses.length -1; i++) {
        claimarr.push(<Claim 
        name={expenses.expenses[i].name}
        date={expenses.expenses[i].date_sent}
        cost={expenses.expenses[i].amount}
        status={expenses.expenses[i].status}>
        </Claim>)
      }

  return (
    <>
    <h2>Historic Claims</h2>
    <div className='Claims-Parent'>
{claimarr}
    </div>
    </>
  )
}
