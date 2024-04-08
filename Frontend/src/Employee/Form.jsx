import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../App.jsx";
import './Form.css';




export default function Form({ token }) {

      
  const user=useContext(UserContext)

  console.log(user.name)

  const [formData, setFormData] = useState({
    currency: 'GBP',
    totalAmount: '',
    description: '',
    receipt: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.addEventListener('load', () => {
      const base64String = reader.result;
      setFormData(prevState => ({
        ...prevState,
        receipt: base64String
      }))});
    // Read the selected file as a data URL
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = {
      ClaimHolderID:user.username,
      ClaimHolderName:user.name,
      Currency:formData.currency,
      Amount:formData.totalAmount,
      Description:formData.description,
      ClaimState:'Pending',
      DepartmentID:user.DepartmentID,
      FTUaccount:null,
      ManagerComments:null,
      ImagePath:formData.receipt
      }

      console.log(formDataToSend)


      const response = await axios.post(
        `http://localhost:3000/api/employee/${user.token}`,
        formDataToSend
      );

      // Handle response as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle error as needed
    }
  };


    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleClick = () => {
      setIsFlipped(!isFlipped);
    };
  

  return (
    
    <div className='Form-Parent'>
      <h1>Submit a claim</h1>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="formbold-input-flex">
              <div>
                <label htmlFor="currency" className="formbold-form-label">Currency</label>
                <select
                  className="formbold-form-input"
                  name="currency"
                  id="currency"
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <option value="GBP">GBP (£)</option>
                  <option value="USD">USD ($)</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label htmlFor="totalAmount" className="formbold-form-label">Total Amount</label>
                <input
                  type="text"
                  name="totalAmount"
                  id="totalAmount"
                  className="formbold-form-input"
                  value={formData.totalAmount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="formbold-mb-3">
              <label htmlFor="description" className="formbold-form-label">Please provide a short description of the claim</label>
              <input
                type="text"
                name="description"
                id="description"
                className="formbold-form-input"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="formbold-form-file-flex">
              <label htmlFor="receipt" className="formbold-form-label">Upload Receipt</label>
              <input
                type="file"
                name="receipt"
                id="receipt"
                className="formbold-form-file"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="formbold-btn">Submit Claim</button>
          </form>
        </div>
      </div>
      </div>
  );
}
