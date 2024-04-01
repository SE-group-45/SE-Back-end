const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');


// check the account signed in is valid admin account
const CheckAccount = async (token) => {
    try {
        // find the account given the token generated on login
        const account = await Account.find({ Token: token });
        if (!account) {
            return false;
        }
        // check if unique account token is connected to account of type admin
        else if (account.UserType != 'Admin') {
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
        const validDetails = CheckAccount(req.params.token);
        if (validDetails) {
            const claims = await Claim.find({});
            res.status(200).json(claims);
        }
        else {
            return res.status(500).json({ message: "Invalid account" })
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while retrieving claims" });
    }
};

const GetAllAccounts = async (req, res) => {
    try {
        const validDetails = CheckAccount(req.params.token);
        if (validDetails) {
            console.log(validDetails)
            const accounts = await Account.find({});
            res.status(200).json(accounts);
        }
        else {
            return res.status(500).json({ message: "Invalid account" })
        }

    } catch (err) {
        res.status(500).json({ message: "An error occurred while retrieving accounts" });
    }
};

const GetAccount = async (req, res) => {
    try {
        const validDetails = CheckAccount(req.params.token);
        if (validDetails) {
            const { UserID } = req.params.userid;
            const account = await Account.findById(UserID);
            if (account == null) {
                return res.status(500).json({ message: "account doesnt exist" })
            }

            res.status(200).json(account);
        }
        else {
            return res.status(500).json({ message: "Invalid account" })
        }

    } catch (err) {
        res.status(500).json({ message: "An error occurred while searching for the account" });
    }
};

const GetClaim = async (req, res) => {
    try {
        const validDetails = CheckAccount(req.params.token);
        if (validDetails) {
            const { ClaimID } = req.params.claimid;
            const claims = await Claim.find(ClaimID);
            res.status(200).json(claims);
        }
        else {
            return res.status(500).json({ message: "Invalid account" })
        }

    } catch (err) {
        res.status(500).json({ message: "An error occurred while searching for the claims" });
    }
};

const CreateAccount = async (req, res) => {
    try {
        const validDetails = CheckAccount(req.params.token);
        if (validDetails) {
            // check if the account id exists
            console.log(req.body.UserID)
            const account = await Account.find({ UserID: req.body.UserID });

            if (account == false) {
                const savedAccount = await Account.create(req.body);
                return res.status(201).json(savedAccount);
            }
            else {
                return res.status(500).json({ message: "Account with ID already exists" });
            }
        }
        else {
            return res.status(500).json({ message: "Invalid account" })
        }


    } catch (err) {
        res.status(500).json({ message: "An error occured trying to create the account" });
    }
};

const DeleteAccount = async (req, res) => {
    try {
        const validDetails = CheckAccount(req.params.token);
        if (validDetails) {
            const { UserID } = req.params.account_id;

            const account = await Account.findByIdAndDelete(UserID);

            if (!account) {
                return res.status(404).json({ message: "Account not found" });
            }

            res.status(200).json({ message: "Account deleted successfully" });
        }
        else {
            return res.status(500).json({ message: "Invalid account" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UpdateAccount = async (req, res) => {
    try {
        const validDetails = CheckAccount(req.params.token);
        if (validDetails) {
            const { UserID } = req.params.account_id;

            const account = await Account.findByIdAndUpdate(User, req.body);

            if (!account) {
                return res.status(404).json({ message: "Account not found" });
            }

            const updatedAccount = await Account.findById(UserID);
            res.status(200).json(updatedAccount);
        }
        else {
            return res.status(500).json({ message: "Invalid account" })
        }

    }
    catch (err) {
        res.status(500).json({ message: "An error occurred while updating the account" });
    }
}



module.exports = {
    CreateAccount,
    GetAllClaims,
    GetAllAccounts,
    GetAccount,
    GetClaim,
    UpdateAccount,
    DeleteAccount
};