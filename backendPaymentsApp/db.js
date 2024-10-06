const mongoose = require('mongoose')

mongoose.connect(`${MY_MONGO_DB_URL}`);

const userSchema = new mongoose.Schema(
    {
        username : {
            type: String,
            required: true,
        },
        
        password : {
            type : String,
            required : true,
        },
        
        firstName : {
            type : String,
            required : true,
        },

        lastName : {
            type : String,
            required : false,
        },
    },
    {
        timestamps : true
    }
);

const User = mongoose.model('User', userSchema);



const accountsSchema = new mongoose.Schema({
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User', 
            required : true
        },
        balance : {
            type : Number,
            required : true 
        }
    },
    {
        timestamps : true
    }
);


const Accounts = mongoose.model('Accounts', accountsSchema)


module.exports = {
    User,
    Accounts
};