let mongoose = require('mongoose');
var Schema = mongoose.Schema;

let couponschema = {

  id_vendor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  clients: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]

}

let schema = new mongoose.Schema(couponschema);

module.exports = schema;
module.exports.couponschema = couponschema;
