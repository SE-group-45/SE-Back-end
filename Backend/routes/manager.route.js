const express = require('express');
const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

// call the functions 
const {GetClaim, ApproveClaim, RejectClaim, ViewPendingClaims}=require('../controllers/manager.controller.js');

// connect router
const router = express.Router();

router.get('/GetClaim/:departmentID/:claimID', GetClaim);

router.put('/ApproveClaim/:token/:dbclaimid', ApproveClaim);

router.put('/RejectClaim/:token/:dbclaimid', RejectClaim);

router.get('/ViewPendingClaims/:token/:departmentID', ViewPendingClaims);

module.exports = router;