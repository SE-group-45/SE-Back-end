<<<<<<< HEAD
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


=======
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


>>>>>>> 8817c14b1bdfe9c9c4f50de67f90aea8bb33cc52
module.exports = router;