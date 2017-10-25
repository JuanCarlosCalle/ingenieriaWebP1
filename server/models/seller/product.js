let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productschema = {

    // todo: verify a unique name for each vendor in a registration
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    id_vendor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    vendorName: {
      type: String,
      required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    }
    /*sku: {
      type: String,
      required: true,
      unique: true
    }*/
};

let schema = new mongoose.Schema(productschema);

module.exports = schema;
module.exports.productschema = productschema;
