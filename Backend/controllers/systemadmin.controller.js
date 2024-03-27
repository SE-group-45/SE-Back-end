const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');




const CreateAccount = async (req, res) => {
    try {
        const { UserID, Password, Expiry, UserType, AccountState, DepartmentID } = req.body;
        const account = new Account({
            UserID,
            Password,
            Expiry, 
            UserType, 
            AccountState, 
            DepartmentID
        });
        const savedAccount = await account.save();
        res.status(201).json(savedAccount);
    } catch (err) {
        res.status(500).json({ message: "An error occured trying to create the account" });
    }
};

const ChangeAccountState = async (req, res) => {
    try {
        const { UserID, newState } = req.body;
        const account = await Account.findById(UserID);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        account.AccountState = newState;
        const updatedAccount = await account.save();
        res.status(200).json(updatedAccount);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while changing account state" });
    }
};

const ViewAllClaims = async (req, res) => {
    try {
        const claims = await Claim.find();
        res.status(200).json(claims);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while retrieving claims" });
    }
};
const ViewAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while retrieving accounts" });
    }
};


// enter the function names here
module.exports = {
    // change this
    CreateAccount,
    ViewAllClaims,
    ViewAllAccounts,
    ChangeAccountState
}