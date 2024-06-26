const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
    // set by system admin not the default set by database.
    // this wil be an id that is conected to the employees id that is used in other existing systems
    UserID:{
        type: String,
        required: true
    },
    Name:{
        type: String,
        required:false,
        default:'unspecified'
    },
    Expiry: {
        type: String,
        required: false,
        default:'12/29'
    },
    Password: {
        type: String,
        required: true
    },
    UserType: {
        type: String,
        required: true,
        default:'Employee'
    },
    AccountState: {
        type:String,
        required: true,
        default:'Active'
    },
    DepartmentID: {
        type:String,
        reuired:true
    },
    Signedin: {
        type:Boolean,
        required: false,
        default: false
    },
    Token:{
        type:String,
        required:false,
        default:''
    },
    Devices:{
        type:Number,
        required: false,
        default:0,
    },
}, {
    // this is the creation date of the account
    timestamps: true,
})

const Account = mongoose.model('Accounts', AccountSchema);

module.exports = Account;