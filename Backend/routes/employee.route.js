const express = require('express');
const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

// call the functions 
const {GetAllClaims,CreateClaim,GetPending,GetClaim}=require('../controllers/employee.controller.js');

// connect router
const router = express.Router();

router.get('/:token',GetAllClaims);

router.post('/:token',CreateClaim);

router.get('/pending/:token',GetPending),

router.get('/singleclaim/:token',GetClaim);


module.exports = router;