const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
    UserID:{
        type: String,
        required: [true]
    },
    Expiry: {
        type: String,
        required: [true, 'Please enter product name'],
    },
    Password: {
        type: String,
        required: true,
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
        type:'String',
        reuired:true,
    }
,
}, {
    // this is the creation date of the account
    timestamps: true,
})


const Product = mongoose.model('Accounts', AccountSchema);

module.exports = Accounts;