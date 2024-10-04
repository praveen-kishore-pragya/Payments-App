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

module.exports = {
    User
};