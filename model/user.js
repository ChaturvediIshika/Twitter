const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    email:String,
    isAdmin:Boolean,
    saved:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Journal'
    }],
    image:{type:String,
        default:"https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"},
    bio:String,
    Name:String,
    Address:String,
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Journal'
    }]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);