const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

const GetClaim = async (req, res) => {
  try {
    const claimRecord = await Claim.findOne({
      departmentID: req.params.departmentID,
      claimID: req.params.claimID
    });
    res.json(claimRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const ApproveClaim = async (req, res) => {
  try {
    const claimRecord = await Claim.findOneAndUpdate(
      { _id: req.params.id },
      { ClaimState: 'Approved by Manager' },
      { new: true }
    );
    res.json(claimRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const RejectClaim = async (req, res) => {
  try {
    const claimRecord = await Claim.findOneAndUpdate(
      { _id: req.params.id },
      { ClaimState: 'Rejected', rejectionReason: req.body.rejectionReason },
      { new: true }
    );
    res.json(claimRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all the claims of the department that are pending
const ViewPendingClaims = async (req, res) => {
  try {
    const claimRecords = await Claim.find({
      departmentID: req.params.departmentID,
      ClaimState: 'Pending'
    });
    res.json(claimRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
    GetClaim, ApproveClaim, RejectClaim, ViewPendingClaims
}