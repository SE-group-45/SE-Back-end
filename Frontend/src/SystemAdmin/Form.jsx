import React from 'react'
import './Form.css'
export default function Form() {
  return (
    <div className='Form-Parent'>
    <h1>Submit a claim</h1>
  <div class="formbold-main-wrapper">

<div class="formbold-form-wrapper">

<form action="/unfinished-endpoint" method="POST">
  
<div class="formbold-input-flex">
<div>
        <label class="formbold-form-label">Currency</label>

        <select class="formbold-form-input" name="occupation" id="occupation">
        <option value="male">GBP (£)</option>
        <option value="female">USD ($)</option>
        <option value="others"></option>
        </select>
    </div>
    <div>
        <label for="email" class="formbold-form-label"> Total Amount </label>
        <input
        class="formbold-form-input"
        />
    </div>
  </div>
  <div class="formbold-mb-3">
    <label for="age" class="formbold-form-label">Please provide a short description of the claim</label>
    <input
      type="text"
      name="age"
      id="age"
      class="formbold-form-input"
    />
  </div>

  <div class="formbold-form-file-flex">
    <label for="upload" class="formbold-form-label">
      Upload Reciept
    </label>
    <input
      type="file"
      name="upload"
      id="upload"
      class="formbold-form-file"
    />
  </div>

  <button class="formbold-btn"> Submit Claim</button>
</form>
</div>
</div>
  </div>
  )
}
