const express = require('express');
const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

// call the functions 
const {GetClaim, ApproveClaim, RejectClaim, ViewPendingClaims}=require('../controllers/manager.controller.js');

// connect router
const router = express.Router();


router.get('/GetClaim/:departmentID/:claimID', GetClaim);
router.put('/ApproveClaim/:id/approve', ApproveClaim);
router.put('/RejectClaim/:id/reject', RejectClaim);
router.get('/ViewPendingClaims/:departmentID', ViewPendingClaims);

module.exports = router;

