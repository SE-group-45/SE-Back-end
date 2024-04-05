const mongoose = require("mongoose");

const ClaimSchema = mongoose.Schema({
    ClaimHolderID: {
        type: String,
        required: true,
    },
    ClaimHolderName:{
        type: String,
        required: true,
    },
    Currency:{
        type: String,
        required:false,
        default:'£'
    },
    Amount:{
        type: String,
        required:true,
    },
    Description: {
        type: String,
        required: true,
    },
    ClaimState: {
        type:String,
        required: false,
        default:'Pending'
    },
    DepartmentID: {
        type:String,
        reuired:true,
    },
    FTUaccount:{
        type: String,
        requires:false,
        default:''
    },
    ManagerComments:{
        type: String,
        required:false,
        default:''
    },
    RejectionReason:{
        type: String,
        required:false,
        default:''
    }
    ,
    ImagePath:{
        type:String,
        required: true,
    }
,
}, {
    // this is the creation date of the account
    timestamps: true,
})


const Claims = mongoose.model('Claims', ClaimSchema);

module.exports = Claims;