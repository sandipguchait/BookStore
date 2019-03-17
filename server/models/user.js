const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV)
const SALT = 10;

//creating mongoose schema
const userSchema = mongoose.Schema({
    email :{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstname: {
        type: String,
        maxlength:100
    },
    lastname: {
        type: String,
        maxlength:100
    },
    role: {
        type: Number,
        default: 0 
    },
    token: {
        type: String
    }
});

// HASHING PASSWORD BEFORE SAVING TO DATABASE
userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){

        bcrypt.genSalt(SALT,function(err,salt){
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next()
    }
});

//COMPARING PASSWORD ( USER + DATABASE )
userSchema.methods.comparePassword = function(inputPassowrd,cb){
    bcrypt.compare(inputPassowrd, this.password, function(err,isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

// GENERATING TOKEN WHEN USER LOGS IN
userSchema.methods.generateToken = function(cb){
    let user = this;
    let token = jwt.sign(user._id.toHexString(),config.SECRET);
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null,user)
    }); 
}

// VERIFY TOKEN OF A LOGGED USER 
userSchema.statics.findByToken = function(token, cb){
    let user = this;

    jwt.verify(token, config.SECRET, function(err,decode){
        user.findOne({ "_id": decode, "token": token}, function(err, user){
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

// DELETE TOKEN WHEN USER LOGOUT 
userSchema.methods.deleteToken = function (token, cb){
    let user = this;
    user.update({ $unset: {token: 1}}, (err, user)=>{
        if (err) return cb(err);
        cb(null, user)
    })
}


const User = mongoose.model('User', userSchema);
module.exports = { User }