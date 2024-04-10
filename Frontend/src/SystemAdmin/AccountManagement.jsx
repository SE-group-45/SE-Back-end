import React from 'react';
import './AccountManagement.css';
import axios from 'axios';
import { UserContext } from '../App';
import { useEffect, useContext, useState } from 'react';
export default function AccountManagement() {
  // get user details via context
  const user = useContext(UserContext);

  const [allUsers, setAllUsers] = useState([]);

  const [chosenUser, setChosenUser] = useState([]);

  const [input, setInput] = useState('');

  const [UpdateAccount, setUpdateAccount] = useState(chosenUser);

  const GetAllUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/systemadministrator/getallaccounts/${user.token}`);
      setAllUsers(result.data);
      setChosenUser([])
    } catch (error) {
      console.error('Error fetching all users:', error);
      // Deal with error
      // Make alert to display error
      // Logout and redirect to login
    }
  };

  function Search() {
    // check if input is number or string
    try {
      if (input == '') {
        alert('feild left empty')
        GetAllUsers();
      }
      else if (!isNaN(input)) {
        // search by id
        console.log(input);
        const filteredusers = allUsers.filter(allUsers => allUsers.UserID.includes(input));
        if (filteredusers.length == 0) {

          alert('the entered values doesnt correlate to any users name or id');

        }
        else {
          setAllUsers(filteredusers);
        }
      }
      else {
        console.log(input);
        // search by name
        const filteredusers = allUsers.filter(allUsers => allUsers.Name.trim().toLowerCase().includes(input))
        if (filteredusers.length == 0) {

          alert('the entered values doesnt correlate to any users name or id')

        }
        else {
          setAllUsers(filteredusers);
        }
      }
      setInput('');
    }
    catch (error) {
    }

  }
  function handleChosenAccount(User) {
    // set all users to none and then 
    setChosenUser(User);
    setAllUsers([]);
  }
  
  async function handleUpdateaccountform(event) {
    event.preventDefault();
    try {
      // api to update account
      const result = await axios.put(`http://localhost:3000/api/systemadministrator/updateaccount/${user.token}/${UpdateAccount._id}`,{
        "UserID":UpdateAccount.UserID,
        "Name":UpdateAccount.Name,
        "Password":UpdateAccount.Password,
        "UserType":UpdateAccount.UserType,
        "AccountState":UpdateAccount.AccountState,
        "DepartmentID":UpdateAccount.DepartmentID,
        "Token":""
      });
      alert('Update made successfully')
      setAllUsers([])
      GetAllUsers()
      
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUpdateAccount({
      ...UpdateAccount,
      [name]: value
    });
  };

  const handlestatechange = (event) => {
    setUpdateAccount({
      ...UpdateAccount,
      AccountState: event.target.value
    });
  }

  const handletypechange = (event) => {
    setUpdateAccount({
      ...UpdateAccount,
      UserType: event.target.value
    });
  }

  useEffect(() => {
    GetAllUsers();
  }, []);

  useEffect(() => {
    setUpdateAccount(chosenUser)
  }, [chosenUser]);


  return (
    <>
      {
        (allUsers.length !== 0) && (
          // display a search bar for certain user given name
          <div className='Claims-Parent'>
            <h1>Account Management</h1>

            {/* deal with invalid id /name*/}

            <div className="search-container">
              <input className='searchbar' id="usernameorid" type="text" placeholder="Search by UserID or name..." value={input} onChange={(e) => setInput(e.target.value)} />
               <button className='searchbutton' onClick={() => Search()}>search</button>
            </div>
           

            {
              allUsers.map((value, key) => (

                <div key={key} className="Inner-Claim-Parent">
                  {console.log(key)}
                  <button className='choose-account-button'
                    onClick={() => handleChosenAccount(value)}
                  >
                    name: {value.Name}
                    <br />
                    UserID: {value.UserID}
                    <br />
                    Type: {value.UserType}
                  </button>
                </div>))
            }
          </div>
        )
      }
      {
        (chosenUser.length !== 0) && (
          <div className='Claims-Parent'>
            <button onClick={GetAllUsers} className='return-button'>Return</button>
            <div className="Inner-Claim-Parent">
              <div className='changeAccount-container'>
                <div>
                  <h1>Current details</h1>

                  <div>
                    UserID:{chosenUser.UserID}
                  </div>
                  <div>
                    Name:{chosenUser.Name}
                  </div>
                  <div>
                    Passord: {chosenUser.Passord}
                  </div>
                  <div>
                    account type: {chosenUser.UserType}
                  </div>
                  <div>
                    DepartmentID: {chosenUser.DepartmentID}
                  </div>
                  <div>
                    Account state: {chosenUser.AccountState}
                  </div>
                </div>

                <div>
                  <h1>Change details here</h1>
                  <form onSubmit={handleUpdateaccountform}>
                    <p>UserID</p>
                    <input type="text" name='UserID' id='userid' placeholder={chosenUser.UserID} onChange={handleFormChange} />
                    <p>Full Name</p>
                    <input type="text" name='Name' id='name' placeholder={chosenUser.Name} onChange={handleFormChange}/>
                    <p>Password</p>
                    <input type="text" name='Password' id='password' placeholder={chosenUser.Password} onChange={handleFormChange}/>
                    <p>Account Type current: {chosenUser.UserType}</p>

{/* deal with option */}
                    <select name="" value={UpdateAccount.UserType} id="" onChange={handletypechange}>
                      <option value="">-- Please select --</option>
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="FTU">Finance team user</option>
                    </select>
                    <p>Department ID</p>
                    <input type="text" name='DepartmentID' id='deptid' placeholder={chosenUser.DepartmentID} onChange={handleFormChange}/>
                    <p>Account State</p>

{/*  deal with option */}
                    <select name="" value={UpdateAccount.AccountState} id="" onChange={handlestatechange}>
                      <option value="">-- Please select --</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Flagged">Flagged</option>
                    </select>
                    
                    <button type='submit' className='change-button'>Change</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        (chosenUser.length == 0 && allUsers.length === 0) && (

          <div >

            empty
          </div>
        )
      }


    </>
  )


}


