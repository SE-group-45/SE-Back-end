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
    Description: {
        type: String,
        required: true,
    },
    UserType: {
        type: String,
        required: true,
        default:'Employee'
    },
    ClaimState: {
        type:String,
        required: true,
        default:'Pending'
    },
    DepartmentID: {
        type:'String',
        reuired:true,
    },
    FTUaccount:{
        type: String,
        requires:false,
        default:''
    },
    RejectionReason:{
        type: String,
        required:false,
        default:''
    }
    ,
    ImagePath:{
        type:'String',
        required: true,
    }
,
}, {
    // this is the creation date of the account
    timestamps: true,
})


const Claims = mongoose.model('Claims', ClaimSchema);

module.exports = Claims;