const mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  lastname: {
    type: String,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  userInfo: {
    type: String,
    trim: true,
  },

  //TODO: come back here
  encry_password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: Number, // More the number more the priveleges user gets
    // 0 - user, 1 - , 2 - admin ....
    default: 0,
  },
  purchases: {
    type: Array,
    default: [],
  },
}, {timestamps : true}
);

userSchema.virtual("password")
  .set(function(password){
      this._password = password;     // _password such that it is a private variable
      this.salt = uuidv1();
      this.encry_password = this.securePassword(password);
    })
  .get(function(){
      return this._password;
  })

userSchema.methods = {
    authenticate : function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword : function(plainpassword){
        if(!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');

        } catch (err) {
            return "";
        }
    }
};

// We need to export this schema in order to use it.
// first argument is what we want to call it(name), second argument is what it
// actually is (name).

module.exports = mongoose.model("User", userSchema);
