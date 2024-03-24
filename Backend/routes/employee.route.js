const express = require('express');
const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

// call the functions 
const {GetAllClaims,CreateClaim}=require('../controllers/employee.controller.js');

// connect router
const router = express.Router();

router.get('/:username/:password',GetAllClaims);

router.post('/:username/:password',CreateClaim);


module.exports = router;