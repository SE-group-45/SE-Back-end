const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

// check the account signed in is valid employee account
const CheckAccount = async (token) => {
    try {
        const account = await Account.find({ Token: token });
        if (!account) {
            return false;
        }
        else if (account.UserType != 'Employee') {
            return false;
        }
        return true
    }
    catch (err) {
        return false;
    }
}

const GetAllClaims = async (req, res) => {
    try {
        console.log(req.params.token)
        const ValidAccount = CheckAccount(req.params.token);
        if (ValidAccount) {
            const account = await Account.find({ Token: req.params.token });
            const claims = await Claim.find({ ClaimHolderid: account.UserID });
            console.log(claims)
            return res.status(200).json(claims);
        }
        else {
            return res.status(400).json({ error: "invalid account" })
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while fetching data" });
    }
};

const GetPending = async (req, res) => {
    try {
        const ValidAccount = CheckAccount(req.params.token);
        if (ValidAccount) {
            const account = await Account.find({ Token: req.params.token });
            // get all the claims that belong to the user by the user id
            console.log(account);
            const claims = await Claim.find({ ClaimHolderid: account.UserID,ClaimState:'Pending' });
            return res.status(200).json(claims);
        }
        else {
            return res.status(400).json({ error: "invalid account" })
        }
    }
    catch (err) {
        res.status(500).json({ message: 'error getting claims' })
    }
};

const GetClaim= async (req, res) => {
    try {
        const ValidAccount = CheckAccount(req.params.token);
        if (ValidAccount) {
            const account = await Account.find({ Token: req.params.token });
            // get all the claims that belong to the user by the user id
            console.log(account);
            const claims = await Claim.find({ ClaimHolderid: account.UserID,ClaimState:'Pending' });
            return res.status(200).json(claims);
        }
        else {
            return res.status(400).json({ error: "invalid account" })
        }
    }
    catch (err) {
        res.status(500).json({ message: 'error getting claims' })
    }
};

const CreateClaim = async (req, res) => {
    try {

        const ValidAccount = CheckAccount(req.params.token);

        if (ValidAccount) {
            console.log(req.body)
            const { claim } = await Claim.create(req.body);
            return res.status(200).json({ message: 'claim successfully made' });
        }
        else {
            return res.status(400).json({ error: "invalid account" })
        }
    }
    catch (err) {
        res.status(500).json({ message: 'error creating claim' })
    }
};

// enter the function names here
module.exports = {
    // change this
    GetAllClaims,
    CreateClaim,
    GetPending,
    GetClaim,

}