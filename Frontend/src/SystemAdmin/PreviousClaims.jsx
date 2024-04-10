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

  const [AllClaims, setAllClaims] = useState([]);

  const[filteredclaims, setFilteredClaims] = useState([]);

  const GetAllUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/systemadministrator/getallaccounts/${user.token}`);
      const employees=result.data

      if(result){
        const filteredusers = employees.filter(allUsers => allUsers.UserType === 'Employee');
        setAllUsers(filteredusers);
      }
      
      
      // filter to have only empoyees
      setChosenUser([])
    } catch (error) {
      console.error('Error fetching all users:', error);
      // Deal with error
      // Make alert to display error
      // Logout and redirect to login
    }
  };


  const GetAllClaims = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/systemadministrator/getallclaims/${user.token}`);
      
     console.log(result);
     setAllClaims(result.data);
    //  filter claims

      
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

        const filteredusers = allUsers.filter(allUsers => allUsers.UserID === input)
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

  useEffect(() => {
    GetAllUsers();
  }, []);

  useEffect(() => {
    // run function to display all claims and display for chosen user
    GetAllClaims();

  }, [chosenUser]);

  useEffect(() => {

    // filter
    const filter=AllClaims.filter(claim => claim.ClaimHolderID==chosenUser.UserID);
    setFilteredClaims(filter);
    console.log(filter);
  }, [AllClaims]);

  return (
    <>
      {
        (allUsers.length !== 0) && (
          // display a search bar for certain user given name
          <div className='Claims-Parent'>
            <h1>Account Management</h1>

            {/* deal with invalid id /name*/}

            <div className="search-container">
              <input id="usernameorid" type="text" placeholder="Search by UserID or name..." value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <button onClick={() => Search()}>search</button>

            {
              allUsers.map((value, key) => (

                <div key={key} className="Inner-Claim-Parent">
                  {console.log(key)}
                  <button
                    onClick={() => handleChosenAccount(value)}
                  >
                    name: {value.Name}
                    <br />
                    UserID: {value.UserID}
                  </button>
                </div>))
            }
          </div>
        )
      }
      {/* display claims of the user */}
      {
        (allUsers.length === 0 &&chosenUser.length!==0) &&(
          <div className='Claims-Parent'>
          <div>
             {
              filteredclaims.map((value, key) => (

                <div key={key} className="Inner-Claim-Parent">
                  <h2>{value.ClaimHolderName}</h2>
        
                  <div>£{value.Amount}</div>
                  <div>{value.ClaimState}</div>
                  <span>{value.Description}</span>
                </div>))
            }
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


