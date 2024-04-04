import { useState } from 'react'
import ProfilePic from './assets/profile.jpg';
import Search from './assets/search.png';
import Plus from './assets/plus.svg';
import Previous from './assets/Previous.svg';
import './App.css'
import Form from './Form';
import CurrentClaims from './CurrentClaims'
import PreviousClaims from './PreviousClaims';


function App() {

  const [page, setPage] = useState(<Form></Form>) 

  return (
    <>
    <div className='Content-Header'>
      <div className='Side-Panel'>
        <div className='Profile-Info '>
          <img className='Profile-Pic'src={ProfilePic}></img>
          <h2>HUGH TAYLOR</h2>
          <h3>FDM Employee</h3>
        </div>
        <div className='Options-Container'>
          <div className='Claim-Parent' onClick={()=>setPage(<Form></Form>)}>
            <div>SUBMIT CLAIM</div>
            <img className='Plus-Icon'src={Plus}></img>
          </div>
          <div className='Claim-Parent' onClick={()=>setPage(<CurrentClaims></CurrentClaims>)}>
            <div>VIEW CLAIM</div>
            <img className='Search-Icon'src={Search}></img>
          </div>
          <div className='Claim-Parent' onClick={()=>setPage(<PreviousClaims></PreviousClaims>)}>
            <div>PREVIOUS CLAIMS</div>
            <img className='Previous-Icon'src={Previous} ></img>
          </div>
        </div>
      </div>
      <div className='Form-Parent'>
      {page}
      </div>

    </div>

    </>
  )
}

export default App
