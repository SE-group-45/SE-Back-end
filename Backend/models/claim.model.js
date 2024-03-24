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
        default:'Active'
    },
    DepartmentID: {
        type:'String',
        reuired:true,
    },
    ImagePath:{
        type:'String',
        required: true,
    }
,
}, {
    // this is the creation date of the account
    timestamps: true,
})


const Product = mongoose.model('Accounts', AccountSchema);

module.exports = Claims;