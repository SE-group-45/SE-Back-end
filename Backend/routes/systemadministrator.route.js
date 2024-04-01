const express = require('express');
const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

// call the functions 
const {CreateAccount,DeleteAccount,GetAllClaims,GetAllAccounts,GetAccount,GetClaim,UpdateAccount}=require('../controllers/systemadministrator.controller.js');


// connect router
const router = express.Router();


// Create a new account
router.post('/create/:token', CreateAccount);

// Get all claims
router.get('/getallclaims/:token', GetAllClaims);

// Get all accounts
router.get('/getallaccounts/:token', GetAllAccounts);

// Get a specific account by ID
router.get('/getsingleaccount/:token/:userid', GetAccount);

// Get all claims for a specific account
router.get('/getsingleclaim/:token/:claimid', GetClaim);

// Update an account
router.put('/updateaccount/:token/:dbid', UpdateAccount);

// Delete an account
router.delete('/delete/:token/:dbid', DeleteAccount);


module.exports = router;