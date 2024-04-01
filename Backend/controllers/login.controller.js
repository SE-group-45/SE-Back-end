const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');
const { Router } = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { fetchuser } = require("../middleware/fetchuser.js");

// UNREQUIRED system admin has accounts created already and they add the accounts manually.
// ROUTE 1: Create a User using: POST "/api/auth/createuser.No login required"
// OPTIONAL change this to send a request to a System admin to request an account:then they can add an UserID and be updated when it is created.
// router.post(
//     "/createuser",
//     [
//       body("name", "minimum name length is 3").isLength({ min: 3 }),
//       body("UserID", "Enter a valid UserID").isUserID(),
//       body("password", "minimum password length is 5").isLength({ min: 5 }),
//     ],
//     async (req, res) => {
//       // Catches error for the conditions above
//       //If there are errors, return Bad request and the errors
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       try {
//         // Chck whether the user with this UserID exists already
//         let user = await User.findOne({ UserID: req.body.UserID });
//         if (user) {
//           return res
//             .status(400)
//             .json({ error: "Sorry a user with this UserID already exists" });
//         }
//         // hashing+adding salt to the password to store in the Database
//         const salt = await bcrypt.genSalt(10);
//         const secPass = await bcrypt.hash(req.body.password, salt);
//         // create a new user(to the database)
//         user = await User.create({
//           name: req.body.name,
//           password: secPass,
//           UserID: req.body.UserID,
//         });
//         const secret = "FDM_Secret_String";
//         const data = {
//           user: {
//             id: user.id,
//           },
//         };
//         const authtoken = jwt.sign(data, secret);
//         res.json({ authtoken: authtoken });
//       } catch (error) {
//         console.error(error.mesage);
//         res
//           .status(500)
//           .json({ message: "Internal Server Error", error: error.mesage });
//       }
//     }
//   );


//ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". login required
// router.post("/getuser", fetchuser, async (req, res) => {
//     try {
//       let userId = req.user.id;
//       const user = await User.findById(userId).select("-password");
//       res.json(user);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error ");
//     }
//   });

// ROUTE 2: Authenticate a User: POST "/api/auth/lgoin.
const DealWithSignin = async (req, res) => {
    // Catches error for the conditions above
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    try {
        
        let user = await Account.findOne({ UserID: req.body.UserID });
        // If users UserID doesnt exist, return BAD request
        if (!user) {
            return res.status(400).json({ error: "Incorrect credentials" });
        }
        //   check if the user is signed in on another device
        else if (user.Signedin) {
            return res.status(400).json({ errors: "User already signed in" });
        }
       

        // implement the bycrypt method in the system admin account creation operation if you want to.
        const passwordCompare =  (req.body.Password==user.Password)
        // returns True if password in DB matches input password
     
        // If DB doesnt match the password, return BAD request
        if (!passwordCompare) {
            return res.status(400).json({ error: "Incorrect credentials" });
        }
        const secret = "FDM_Secret_String";
        const data = {
            user: {
                id: user.id,
            },
        };
        const authtoken = jwt.sign(data, secret);
        // this token is what will be used for all api calls during the session for a single account
        res.json({ authtoken: authtoken });


        // update db to make user signed in
        // can be used as a check to make it so a user cannot be signed in on multiple devices at the same time.
        // token i sgenerated on login and is used to track the session and in every ai call for the user in the session
       
        const Update = await Account.findByIdAndUpdate(user._id, {Signedin:true, Token: authtoken });

        if(!Update){
            res.status(500).send("Failed to login");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }
};

// make user signout
const DealWithSignout = async (req, res) => {
    try{
        let user = await Account.findOne({ UserID: req.body.UserID });
        const Update = await Account.findByIdAndUpdate(user._id, { Signedin: false , Token: ''});

        if(!Update){
            res.status(500).send("Failed to sign out");
        }
        res.status(200).send("User signed out");

    }
    catch(error){
        res.status(500).send("Failed to sign out");
    }
};

module.exports = {
    DealWithSignin,
    DealWithSignout
}