  // App.js

  import { useState, createContext, useEffect } from 'react'
  import reactLogo from './assets/react.svg'
  import viteLogo from '/vite.svg'
  import './App.css'
  import axios from 'axios';
    import "./style.css";
  import TopNav from "./TopNav.jsx";
  import Employee from './Employee/Employee.jsx';
  import Manager from './Manager/Manager.jsx';
  import Admin from './SystemAdmin/Admin.jsx';
  import FTU from './FinanceTeamUser/FTU.jsx';


  export const UserContext = createContext()

  function App() {
    const [User, setUser] = useState();


    useEffect(()=>{
      console.log("rendered!")
      const userobj = getUserObjectFromLocalStorage()
      if (userobj){
        setUser(userobj)
        setSignedin(true)
      }
    },[])
    
    const [Signedin, setSignedin] = useState(false);

    async function saveUserObjectToLocalStorage(userObject) {
      try {
          // Convert the userObject to a JSON string
          const userJSON = JSON.stringify(userObject);
          
          // Store the JSON string in localStorage under the key 'user'
          localStorage.setItem('user', userJSON);
          
          console.log('User object saved to localStorage successfully.');
      } catch (error) {
          console.error('Error saving user object to localStorage:', error);
      }
  }

  function getUserObjectFromLocalStorage() {
    try {
        // Get the JSON string from localStorage for the key 'user'
        const userJSON = localStorage.getItem('user');
        
        // Parse the JSON string to convert it back to an object
        const userObject = JSON.parse(userJSON);

        return userObject;
    } catch (error) {
        console.error('Error fetching user object from localStorage:', error);
        return null; // Return null if there's an error
    }
}


    const handleLogin = (userData) => {

      const userobj = {
        username: userData.UserID,
        name:userData.name,
        usertype: userData.UserType,
        token:userData.authtoken,
        DepartmentID: userData.DepartmentID
    }
    
      setUser(userobj) 
      saveUserObjectToLocalStorage(userobj)
      setSignedin(true);
 
    }

    async function handleLogout(userData){
      try {
        const response = await axios.patch(
          'http://localhost:3000/api/login/logout',
          {UserID:userData.username}
        );

        const logoutdata = response.data
        if (logoutdata){
          saveUserObjectToLocalStorage(null)
          setSignedin(false);
        }
      } catch (error) {

        console.log("Unknown error occurred during log.", error);
      }

      
     
    }
    
    useEffect(() => {
      // Perform any necessary actions when user data changes
    }, [User])

    if (!Signedin) {
      return (
        <>
          <LoginPage onLogin={handleLogin}/>
        </>
      )
    } else {
      return (
        <UserContext.Provider value={User}>
          {User.usertype === 'Employee' &&  <div><button className='LogOut' onClick={()=>handleLogout(User)}>LOG OUT</button><Employee/></div>}
          {User.usertype === 'Manager' &&  <div><button className='LogOut' onClick={()=>handleLogout(User)}>LOG OUT</button><Manager/></div>}
          {User.usertype === 'FTU' && <div><button className='LogOut' onClick={()=>handleLogout(User)}>LOG OUT</button><FTU/></div>}
          {User.usertype === 'Admin' && <div><button className='LogOut' onClick={()=>handleLogout(User)}>LOG OUT</button><Admin/></div>}
        </UserContext.Provider>
      );
    }
  }

  export default App;

  const LoginPage = ({ onLogin}) => {

    const [wrongpass, setwrongpass] = useState()

    async function handleinput(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const email = formData.get('email');
      const password = formData.get('password');

      try {
        const response = await axios.patch(
          'http://localhost:3000/api/login',
          {UserID: email, Password: password}
        );
        
        const userData = response.data; // Assuming response data contains user information
        console.log("Here is the userdata" + userData);
        if (userData.authtoken){
          onLogin(userData)
        }
        
        else{
          saveUserObjectToLocalStorage(null)
          setwrongpass(<div style={{color:'red'}}>Incorrect password or email</div>)
        }
      } catch (error) {
        //if the account is inactive
        alert(error.response.data.errors);
        setwrongpass(<div style={{color:'red'}}>Incorrect password or email</div>)
        console.log("Unknown error occurred during login.", error);
      }
    }

    return (
      <>
      <TopNav/>
    <link rel="stylesheet" href="style.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
      <div class="center">    
         <div class="container">   
            <div class="text">
               Worker Portal
            </div>
            <form onSubmit={handleinput}>
               <div class="data">
                  <label>Company Email</label>
                  <input name="email" required />
               </div>
               <div class="data">
                  <label>Password</label>
                  <input name="password" type="password" required />
               </div>
               <div class="btn">
                  <div class="inner"></div>
                  <button type="submit" value="Login">Sign in</button>
              
               </div>
            </form>
            {wrongpass} 
         </div>
      </div>


      
      </>

    );
  };
