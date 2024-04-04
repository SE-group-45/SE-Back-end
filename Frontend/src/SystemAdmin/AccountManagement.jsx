import React from 'react';
import './AccountManagement.css';

export default function AccountManagement() {
  return (
    <div className='Form-Parent'>
      <h1>Account Management</h1>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form action="/unfinished-endpoint" method="POST">
            <h2>Users</h2>
            <h6>Select which user to access</h6>
            <div className="formbold-input">
              <div className="search-container">
                <input type="text" placeholder="Search..." />
              </div>
            </div>
            <button type="submit" className="formbold-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
