import { useState, createContext, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

// import all pages as components
import Employee from './Employee/Employee.jsx';
import Manager from './Manager/Manager.jsx';
import Admin from './SystemAdmin/Admin.jsx';
import FTU from './FinanceTeamUser/FTU.jsx';



export const UserContext = createContext()

function App() {


  // main idea for thi spage is to place the login form here
  // Username and password state
  const [User, setUser] = useState({
    username: 'none',
    password: 'none',
    usertype: 'none'
  })

  // just an idea of what causes the page to switch
  const [Signedin,setSignedin] = useState(false);

  // just an idea 
  useEffect(() => {
    // if valid usertype setSignedin(!Signedin)

  },[User])


  // api call to deal with login 
  async function handleinput() {
    // this will be in a similar format to the GUI CW api call - will be complete by monday hopefully
    try {

      const response = await axios.get(
        `http://localhost:3000/api/products`
      );

      console.log(response.data);
      // set the use states
    } catch (error) {
      console.log("unknown");
    }
    // clear the input field
  }


  // check if user is sughned in
  // if not display login page
  if (Signedin) {
    return (
      <>
        {/* LOGIN PAGE */}
        {/* submit button */}
        <button onClick={handleinput}>
          click
        </button>
      </>
    )
  }
  // if user signed in
  else {
    // the base of each pages styling will remain the same, meaing what should change is the divs that display 
    return (
      // the context here will pass the user details
      <UserContext.Provider value={User}>

        {/* depending on user type they will link to different components */}


        {
          User.usertype == 'emplyee' && (
            // employee component
            <>
            <Employee />
            </>
          )
        }
        {
          User.usertype == 'manager' && (
            // manager component
            <>
            <Manager />

            </>
          )
        }
        {
          User.usertype == 'financeteamuser' && (
            // FTU   component
            <>
            <FTU />

            </>
          )
        }
        {
          User.usertype == 'systemadministrator' && (
            // admin component
            <>
            <Admin />

            </>
          )
        }
      </UserContext.Provider>
    );
  }
}

export default App
