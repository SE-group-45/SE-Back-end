const express = require('express');
const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

// call the functions 
const {GetClaim, ApproveClaim, RejectClaim, GetPendingClaims,GetPreviousClaims}=require('../controllers/financeteamuser.controller.js');

// connect router
const router = express.Router();

// get all pending claims assigned to user
router.get('/getpendingclaims/:token', GetPendingClaims);
// get all previous claims
router.get('/getpreviousclaims/:token', GetPreviousClaims);

// get a single claim assigned to user
router.get('/viewclaim/:claimid/:token', GetClaim);
// approve claim
router.put('/approve/:claimid/:token', ApproveClaim);
// reject claim
router.put('/deny/:claimid/:token', RejectClaim);

module.exports = router;
