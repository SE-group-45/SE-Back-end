const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');



// check the account signed in is valid manager account
const CheckAccount = async (token) => {
  try {
    const account = await Account.find({ Token: token });
    if (!account) {
      return false;
    }
    else if (account.UserType != 'Manager') {
      return false;
    }
    return true

  }
  catch (err) {
    return false;
  }
}

const GetClaim = async (req, res) => {
  try {
    const ValidAccount = CheckAccount(req.params.token);
    if (ValidAccount) {
      const claimRecord = await Claim.findOne({
        departmentID: req.params.departmentID,
        claimID: req.params.claimID
      });
      res.json(claimRecord);
    }
    else {
      return res.status(403).json({ error: "invalid account" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const ApproveClaim = async (req, res) => {
  try {
    const ValidAccount = CheckAccount(req.params.token);

    if (ValidAccount) {
      // this is how they will randomly be assigned to a FTU account
      const [totalResponses, responses] = await Promise.all([
        Account.countDocuments({ UserType:'FinanceTeamUser' }), // Get total count
        Account.find({UserType:'FinanceTeamUser'}) // Fetch all responses
      ]);
      const position=Math.random();
      const randomUser=responses[Math.floor(position*totalResponses)]
      const claimRecord = await Claim.findOneAndUpdate(
        { _id: req.params.id },
        { ClaimState: 'Approved by Manager',FTUaccount: randomUser._id},
        { new: true }
      );

      res.json(claimRecord);
      
    }
    else {
      return res.status(403).json({ error: "invalid account" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const RejectClaim = async (req, res) => {
  try {
    const ValidAccount = CheckAccount(req.params.token);

    if (ValidAccount) {
      const claimRecord = await Claim.findOneAndUpdate(
        { _id: req.params.id },
        { ClaimState: 'Rejected', RejectionReason: req.body.rejectionReason },
        { new: true }
      );
      res.json(claimRecord);
    }
    else {
      return res.status(403).json({ error: "invalid account" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all the claims of the department that are pending
const ViewPendingClaims = async (req, res) => {
  try {
    const ValidAccount = CheckAccount(req.params.token);

    if (ValidAccount) {
      const claimRecords = await Claim.find({
        departmentID: req.params.departmentID,
        ClaimState: 'Pending'
      });
      res.json(claimRecords);

    }
    else {
      return res.status(403).json({ error: "invalid account" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  GetClaim, ApproveClaim, RejectClaim, ViewPendingClaims
}