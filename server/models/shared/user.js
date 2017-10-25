let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let config = require('../../config/settings');

let userschema = {

  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true
  }
};

let schema = new mongoose.Schema(userschema);

schema.methods.generateJwt = function () {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        role: this.role,
        exp: parseInt(expiry.getTime()/1000)
    }, config.secret);
};

module.exports = schema;
module.exports.userschema = userschema;
