const express = require('express');
const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

// call the functions 
const {CreateAccount,DeleteAccount,GetAllClaims,GetAllAccounts,GetAccount,GetClaims,ChangeAccountState,ChangePassword,ChangeExpiry,ChangeUserType,ChangeDepartmentID}=require('../controllers/systemadministrator.controller.js');

// connect router
const router = express.Router();


// Create a new account
router.post('/:username/:password', CreateAccount);

// Get all claims
router.get('/:username/:password', GetAllClaims);

// Get all accounts
router.get('/:username/:password', GetAllAccounts);

// Get a specific account by ID
router.get('/:username/:password', GetAccount);

// Get all claims for a specific account
router.get('/:username/:password', GetClaims);

// Change the state of an account
router.put('/:username/:password', ChangeAccountState);
// Delete an account
router.delete('/:username/:password', DeleteAccount);

// Change the password of an account
router.put('/:username/:password', ChangePassword);

// Change the expiry date of an account
router.put('/:username/:password', ChangeExpiry);

// Change the user type of an account
router.put('/:username/:password', ChangeUserType);

// Change the department ID of an account
router.put('/:username/:password', ChangeDepartmentID);

module.exports = router;