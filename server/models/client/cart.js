let mongoose = require('mongoose');
let Product = require('../seller/product');
let Schema = mongoose.Schema;

let cartschema = {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    batch: [{
        id_vendor: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        vendorName: {
            type: String,
            required: true
        },
        products: [ Product.productschema ]
    }]
    /*product: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }]*/
};

let schema = new mongoose.Schema(cartschema);

module.exports = schema;
module.exports.cartschema = cartschema;
