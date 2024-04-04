import React from 'react'
import './Form.css'
export default function createAccount() {
  return (
    <div className='Form-Parent'>
    <h1>Create Account</h1>
    <div class="formbold-main-wrapper">
      
      <div class="formbold-form-wrapper">

      <form action="/unfinished-endpoint" method="POST">
        <h2>Account info</h2>
        <h6>Please enter a unique user id</h6>
        <div class="formbold-input-flex">
          
          <div>
              <label for="email" class="formbold-form-label"  > User ID </label>
              <input type='text' class="formbold-form-input" id='userID' placeholder='Input text'/>
          </div>

          <div>
              <label for="email3" class="formbold-form-label"> Password </label>
              <input type='password' class="formbold-form-input" id='password' placeholder='Input text'/>
          </div>
        </div>

          
        <div class="formbold-mb-3">
          <label for="age" class="formbold-form-label">User type</label>
          <input
            type="text"
            name="type"
            id="type"
            class="formbold-form-input"
            placeholder='Input text'
          />
        </div>

        <div class="formbold-input-flex">

          <div>
              <label for="email3" class="formbold-form-label"> expiry </label>
              <input type='date' class="formbold-form-input" id='date' placeholder='Input text'/>
          </div>
        </div>

        <button class="formbold-btn"> Submit </button>
      </form>
      </div>
      </div>
    </div>
  )
}
