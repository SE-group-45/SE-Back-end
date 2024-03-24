const Account = require('../models/account.model.js');
const Claim = require('../models/claim.model.js');

const GetAllClaims =async (req,res)=>{
    try{
        //get claims by username
        const UserID=req.params.username;
        const Password = req.params.password;

        // check if the accout exists and details are valid
        const account = await Account.findOne({UserID, Password});
        if(!account){
            // account with details not found
            return res.status(404).json({message:'account not found'})
        }
        else{
            // get all the claims that belong to the user by the user id
            const claims = await GetAllClaims.find({_id:account._id});
            return res.status(200).json(claims);
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "An error occurred while fetching data" });
    }
};

const CreateClaim =async (req,res)=>{
    try{
        //get claims by username
        const UserID=req.params.username;
        const Password = req.params.password;

        // check if the accout exists and details are valid
        const account = await Account.findOne({UserID, Password});
        if(!account){
            // account with details not found
            return res.status(404).json({message:'account not found'})
        }
        else{
            const {claim}= await Claim.create(req.body)
            res.status(200).json(claim); 
        }
    }
    catch(err){
        res.status(500).json({message:'error creating claim'})
    }
};

// enter the function names here
module.exports = {
    // change this
    GetAllClaims,
    CreateClaim

}