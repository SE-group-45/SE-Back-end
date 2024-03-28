const express = require('express');
const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

// call the functions 
const {CreateAccount,DeleteAccount,GetAllClaims,GetAllAccounts,GetAccount,GetClaim,UpdateAccount}=require('../controllers/systemadministrator.controller.js');


// connect router
const router = express.Router();


// Create a new account
router.post('/:username/:password', CreateAccount);

// Get all claims
router.get('/:username/:password', GetAllClaims);

// Get all accounts
router.get('/:username/:password', GetAllAccounts);

// Get a specific account by ID
router.get('/:username/:password/:id', GetAccount);

// Get all claims for a specific account
router.get('/:username/:password/:id', GetClaim);

// Update an account
router.put('/:username/:password/:id', UpdateAccount);

// Delete an account
router.delete('/:username/:password/:id', DeleteAccount);


module.exports = router;