const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

// check the account signed in is valid manager account
const CheckAccount = async (token) => {
    try {
        const account = await Account.find({ Token: token });
        if (!account) {
            return false;
        }
        else if (account.UserType != 'FTU') {
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
            const account = await Account.find({ Token: req.params.token });
            const claimRecord = await Claim.findOne({
                FTUaccount: account._id,
                _id: req.params.claimid
            });
            //   check if the account and claim match
            if (!claimRecord) {
                return res.status(403).json({ error: "request denied" })
            }
            return res.json(claimRecord);
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
        console.log('here');
        const ValidAccount = CheckAccount(req.params.token);
        if (ValidAccount) {
            const account = await Account.findOne({ Token: req.params.token });
            console.log(account)
            const claimRecord = await Claim.findOne({
                _id: req.params.claimid,
                FTUaccount: account._id
            });
            console.log(claimRecord)
            //   check if the account and claim match
            if (!claimRecord) {
                return res.status(403).json({ error: "request denied" })
            }
            const Updatedclaim = await Claim.findOneAndUpdate(
                { _id: req.params.claimid },
                { ClaimState: 'Approved by FTU', Comments:req.body.comments},
                { new: true }
            );
            res.json(Updatedclaim);
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
            const account = await Account.find({ Token: req.params.token });
            const claim = await Claim.findOne({
                FTUaccount: account._id,
                _id: req.params.claimid
            });
            //   check if the account and claim match
            if (!claim) {
                return res.status(403).json({ error: "request denied" })
            }
            const claimRecord = await Claim.findOneAndUpdate(
                { _id: req.params.claimid },
                { ClaimState: 'Rejected', Comments: req.body.comments},
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
const GetPendingClaims = async (req, res) => {
    try {
        const ValidAccount = CheckAccount(req.params.token);

        if (ValidAccount) {
            const account = await Account.findOne({Token: req.params.token});
            console.log(account);


                const claimRecords = await Claim.find({
                    FTUaccount:account._id,
                    ClaimState:'Approved by Manager'
                });
               
            //   check if the account and claim match
            if (!claimRecords) {
                return res.status(204).json({ message: "Account has no claims to prcess yet" })
            }
            else{
                res.json(claimRecords);
            }
        }
        else {
            return res.status(403).json({ error: "invalid account" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Get all the claims of the department that are pending
const GetPreviousClaims = async (req, res) => {
    try {
        const ValidAccount = CheckAccount(req.params.token);

        if (ValidAccount) {
            const account = await Account.findOne({Token: req.params.token});


                const claimRecords = await Claim.find({
                    FTUaccount:account._id,
                    ClaimState:{$ne:'Approved by Manager'}
                });
               
            //   check if the account and claim match
            if (!claimRecords) {
                return res.status(204).json({ message: "Account has no claims to prcess yet" })
            }
            else{
                res.json(claimRecords);
            }
        }
        else {
            return res.status(403).json({ error: "invalid account" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    GetClaim, ApproveClaim, RejectClaim, GetPendingClaims,GetPreviousClaims
}