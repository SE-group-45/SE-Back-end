
import './createAccount.css'
import './Form.css'
import React from 'react';
import './AccountManagement.css';
import axios from 'axios';
import { UserContext } from '../App';
import { useEffect, useContext, useState } from 'react';

export default function createAccount() {
  const user = useContext(UserContext);

  const [User, setUser] = useState({
    "UserID":'',
    "Name":'',   
     "Expiry":'',
    "Password":'',
    "UserType":'',
    "AccountState":'',
    "DepartmentID":'',

  });
 
  // api call to create account
  async function handleUserform(event) {
    event.preventDefault();
    try {
      console.log(User)
      // api to create account
      const result = await axios.post(`http://localhost:3000/api/systemadministrator/create/${user.token}`,{
        "UserID":User.UserID,
        "Name":User.Name,
        "Expiry":User.Expiry,
        "Password":User.Password,
        "UserType":User.UserType,
        "AccountState":User.AccountState,
        "DepartmentID":User.DepartmentID,
  
      });
      console.log(result)
      alert('Account made successfully')
      setUser({
        "UserID":'',
        "Name":'',   
         "Expiry":'',
        "Password":'',
        "UserType":'',
        "AccountState":'',
        "DepartmentID":'',
      })
      
      
    } catch (error) {
      alert(error.response.data.message)
      console.log(error);
    }
  }
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...User,
      [name]: value
    });
  };
  const handlestatechange = (event) => {
    setUser({
      ...User,
      AccountState: event.target.value
    });
  }

  const handletypechange = (event) => {
    setUser({
      ...User,
      UserType: event.target.value
    });
  }

  return (
    <div className='Form-Parent'>
    <h1>Create Account</h1> 
    <div class="formbold-main-wrapper">
      
      <div class="formbold-form-wrapper">

      <form onSubmit={handleUserform} class='form-table'>
        <h2>Account info</h2>        
        <div>
              <label for="email" class="formbold-form-label full-name" > Full Name </label>
              <input type="text" name='Name' id='Name' placeholder={User.Name} onChange={handleFormChange} />
          </div>
        
        <div class="formbold-input-flex">
          
          <div>
              <label for="email" class="formbold-form-label"  > User ID </label>
              <h6>Please enter a unique user id</h6>
              <input type="text" name='UserID' id='userid' placeholder={User.UserID} onChange={handleFormChange} />
          </div>
  
        
          <div>
              <label for="email3" class="formbold-form-label"> Password </label>
              <input type="text" name='Password' id='password' placeholder={User.Password} onChange={handleFormChange}/>
          </div>  
     
        </div>

          
        <div class="formbold-mb-3">
          <label for="age" class="formbold-form-label" >User type</label>
          <select name="" value={User.UserType} id='' onChange={handletypechange}>
                      <option value="">-- Please select --</option>
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="FTU">Finance team user</option>
                    </select>
        </div>


        <div class="formbold-input-flex">

          <div>
              <label for="email3" class="formbold-form-label"> Department ID</label>
       
                    <input type="text" name='DepartmentID' id='deptid' placeholder={User.DepartmentID} onChange={handleFormChange}/>
          </div>
        </div>


        <div class="formbold-mb-3">
          <label for="age" class="formbold-form-label">Account state</label>
          <select name="" value={User.AccountState} id="" onChange={handlestatechange}>
                      <option value="">-- Please select --</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Flagged">Flagged</option>
                    </select>
        </div>


        <div class="formbold-input-flex">
          <div>
              <label for="email3" class="formbold-form-label"> expiry </label>
              <input name='Expiry' type='date' class="formbold-form-input" id='Expiry' placeholder={User.Expiry} onChange={handleFormChange}/>
          </div>
        </div>

        <button class="formbold-btn" type='submit'> Submit </button>
      </form>
      </div>
      </div>
    </div>
  )
}
