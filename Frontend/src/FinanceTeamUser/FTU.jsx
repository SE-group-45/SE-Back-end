import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { UserContext } from "../App.jsx";
// on each page it needs to check the context and see if it matches the component
// every time the api call is made the context needs to be added to the URL
function FTU(){

    // here is the user details used for all api  calls
    const user=useContext(UserContext);

    return(
        <>
        
        </>
    )
}

export default FTU;
