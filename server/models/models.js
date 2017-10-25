let mongoose = require('mongoose');
let _ = require('underscore');
let config = require('../config/settings');

module.exports = function(wagner) {
  mongoose.connect(config.database);

  let Product = mongoose.model('Product', require('./seller/product'), 'products');
  let User = mongoose.model('User', require('./shared/user'), 'users');
  let Cart = mongoose.model('Cart', require('./client/cart'), 'carts');
  let Coupon= mongoose.model('Coupon', require('./seller/coupons'), 'coupons');

  let models = {
    Product: Product,
    User: User,
    Cart: Cart,
    Coupon: Coupon
  };

  _.each(models, function (value, key) {
        wagner.factory(key, function() {
            return value
        })
    });

    return models;
};
