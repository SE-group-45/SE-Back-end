const express = require('express');
const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

// call the functions 
// call the functions 
const {CreateAccount,DeleteAccount,GetAllClaims,GetAllAccounts,GetAccount,GetClaims,ChangeAccountState,ChangePassword,ChangeExpiry,ChangeUserType,ChangeDepartmentID}=require('../controllers/systemadmin.controller.js');


// connect router
const router = express.Router();

// Create a new account
router.post('/:account', CreateAccount);

// Get all claims
router.get('/:claims', GetAllClaims);

// Get all accounts
router.get('/:accounts', GetAllAccounts);

// Get a specific account by ID
router.get('/:account/:id', GetAccount);

// Get all claims for a specific account
router.get('/:account/:id/:claims', GetClaims);

// Change the state of an account
router.put('/:account/:id/:state', ChangeAccountState);
// Delete an account
router.delete('/:account/:id', DeleteAccount);

// Change the password of an account
router.put('/:account/:id/:password', ChangePassword);

// Change the expiry date of an account
router.put('/:account/:id/:expiry', ChangeExpiry);

// Change the user type of an account
router.put('/:account/:id/:usertype', ChangeUserType);

// Change the department ID of an account
router.put('/:account/:id/:departmentid', ChangeDepartmentID);

module.exports = router;