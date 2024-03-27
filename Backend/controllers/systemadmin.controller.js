const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');





const GetAllClaims = async (req, res) => {
    try {
        const claims = await Claim.find();
        res.status(200).json(claims);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while retrieving claims" });
    }
};

const GetAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while retrieving accounts" });
    }
};

const GetAccount = async (req, res) => {
    try {
        const { UserID } = req.body;
        const account = await Account.findById(UserID);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.status(200).json(account);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while searching for the account" });
    }
};

const GetClaims = async (req, res) => {
    try {
        const { UserID } = req.body;
        const claims = await Claim.find({ UserID });
        res.status(200).json(claims);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while searching for the claims" });
    }
};

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
const DeleteAccount = async (req, res) => {
    try {
        const { UserID } = req.body;
        const deletedAccount = await Account.findByIdAndDelete(UserID);
        if (!deletedAccount) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "An error occurred while deleting the account" });
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

const ChangePassword = async (req, res) => {
    try {
        const { UserID, newPassword } = req.body;
        const account = await Account.findById(UserID);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        account.Password = newPassword;
        const updatedAccount = await account.save();
        res.status(200).json(updatedAccount);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while changing Password" });
    }
};

const ChangeExpiry = async (req, res) => {
    try {
        const { UserID, newExpiry } = req.body;
        const account = await Account.findById(UserID);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        account.Expiry = newExpiry;
        const updatedAccount = await account.save();
        res.status(200).json(updatedAccount);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while changing Expiry" });
    }
};

const ChangeUserType = async (req, res) => {
    try {
        const { UserID, newUserType } = req.body;
        const account = await Account.findById(UserID);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        account.UserType = newUserType;
        const updatedAccount = await account.save();
        res.status(200).json(updatedAccount);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while changing UserType" });
    }
};

const ChangeDepartmentID = async (req, res) => {
    try {
        const { UserID, newDepartmentID } = req.body;
        const account = await Account.findById(UserID);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        account.DepartmentID = newDepartmentID;
        const updatedAccount = await account.save();
        res.status(200).json(updatedAccount);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while changing DepartmentID" });
    }
};

module.exports = {
    CreateAccount,
    GetAllClaims,
    GetAllAccounts,
    GetAccount,
    GetClaims,
    ChangeAccountState,
    ChangePassword,
    ChangeExpiry,
    ChangeUserType,
    ChangeDepartmentID,
    DeleteAccount
};