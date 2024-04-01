const express = require('express');
const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

// call the functions 
const {GetClaim, ApproveClaim, RejectClaim, GetClaims}=require('../controllers/financeteamuser.controller.js');

// connect router
const router = express.Router();

// get all claims assigned to user
router.get('/getclaims/:token', GetClaims);
// get a single claim assigned to user
router.get('/viewclaim/:claimid/:token', GetClaim);
// approve claim
router.put('/approve/:claimid/:token', ApproveClaim);
// reject claim
router.put('/deny/:claimid/:token', RejectClaim);

module.exports = router;
