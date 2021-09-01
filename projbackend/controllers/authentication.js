const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');   

exports.signup = (req, res) => {
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            // error: errors.array()[0].param
        })
    }
    
    const user = new User(req.body);  // created an object from class user
    // and as it is derived from mongoose thus contains all the methods and functionalities of database.
    
    // Method to save the user in database
    user.save((err, user) =>{
        if(err){
            return res.status(400).json({
                err: "Not able to save user in Database"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id    
        });
    });
};

exports.signin = (req, res) => {
    
    const errors = validationResult(req);
    // Destructuring of Data
    const {email, password} = req.body;
    
    // Validation Code
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User email does not exists"
            });
        }

        // authenticate function taken from the User model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password do not match"
            });
        }

        // CREATE TOKEN (synchronously)
        const token = jwt.sign({_id: user._id}, process.env.SECRET)

        // PUT TOKEN IN COOKIE
        res.cookie("token", token, {expire: new Date() + 9999});

        // SEND RESPONSE TO FRONTEND 
        //(again destructuring because we dont want to dislay the whole user details including username, password, etc)
        const {_id, name, email, role} = user;
        return res.json({token, user:{_id,name,email,role}});
    });
};

exports.signout = (req, res) => {
    // Clearing the cookie named token
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
};


// Protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    // puts this userProperty (auth) in the req object
    userProperty: "auth"
})


// Custom Middlewares
// In custom middlewares we surely use next.(next is responsible for transferring the 
// control from one middleware to another and from last middleware to response, otheriwse
// our request might be hanging around somewhere in between)
exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "You are not ADMIN, Access denied"
        });
    }
    next();
};