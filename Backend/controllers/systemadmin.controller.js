const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');


const GetAllClaims = async (req, res) => {
    try {
        const claims = await Claim.find({});
        res.status(200).json(claims);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while retrieving claims" });
    }
};

const GetAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({});
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while retrieving accounts" });
    }
};

const GetAccount = async (req, res) => {
    try {
        const {UserID}=req.params;
        const account = await Account.findById(UserID);
        res.status(200).json(account);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while searching for the account" });
    }
};

const GetClaim = async (req, res) => {
    try {
        const {ClaimID}=req.params;
        const claims = await Claim.find(ClaimID);
        res.status(200).json(claims);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while searching for the claims" });
    }
};

const CreateAccount = async (req, res) => {
    try {
        const savedAccount = await Account.create(req.body);
        res.status(201).json(savedAccount);
    } catch (err) {
        res.status(500).json({ message: "An error occured trying to create the account" });
    }
};

const DeleteAccount = async (req, res) => {
    try {
        const { UserID } = req.params;
    
        const account = await Account.findByIdAndDelete(UserID);
    
        if (!account) {
          return res.status(404).json({ message: "Account not found" });
        }
    
        res.status(200).json({ message: "Account deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

const UpdateAccount = async (req, res) => {
    try {
        const {UserID}=req.params;

        const account = await Account.findByIdAndUpdate(User, req.body);   

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        const updatedAccount = await Account.findById(UserID);
        res.status(200).json(updatedAccount);
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