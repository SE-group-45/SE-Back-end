const express = require('express');
const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

// call the functions 
const {GetAllClaims,CreateClaim,GetPending}=require('../controllers/employee.controller.js');

// connect router
const router = express.Router();

router.get('/:token',GetAllClaims);

router.post('/:token',CreateClaim);

router.get('/:token/:claimid',GetPending),


module.exports = router;