let express = require('express');
let status = require('http-status');
let auth = require('../middleware/auth');

module.exports = function (wagner) {

  let api = express.Router();

  api.post('/addToCart', auth.verifyToken, wagner.invoke(function(Cart, Product) {
    return function(req, res) {

        let idClient = req.decoded._id;
        let idProduct = req.body.idProduct;

        // find a product by id
        Product.findById(idProduct, function (error, product) {

            if (error) {
                return res
                    .status(status.INTERNAL_SERVER_ERROR)
                    .json({
                        error: error.toString()
                    });
            }
            let productDetails = product;

            // get its vendor
            let productVendor = product.id_vendor;
            let vendorName = product.vendorName;

            //return the cart from an specific client
            Cart.findOne({client: idClient}).exec(function (error, cart) {

                if(cart) {
                    let vendorExist;

                    // todo: replace this loop with a sub-document search
                    cart.batch.filter(function (group) {

                        let currentVendorId = group.id_vendor;

                        // check if the product vendor is already in the cart (using an iteration over the array)
                        if(currentVendorId.equals(productVendor)){

                            vendorExist = true;
                            group.products.push(productDetails);
                            cart.save();

                            let content = {
                                message: 'El producto se agregó correctamente'
                            };
                            return res.json(content);
                        }
                    });

                    // handling the asynchronous call from "cart.save"
                    if(!vendorExist) {
                        let batch = {
                            id_vendor: productVendor,
                            vendorName: vendorName,
                            products: [productDetails]
                        };

                        cart.batch.push(batch);
                        cart.save();

                        let content = {
                            message: 'El producto se agrego a un lote diferente'
                        };
                        return res.json(content);
                    }

                } else {

                    // create a new object and save it to the cart schema
                    let cart = {
                        client: idClient,
                        batch: [{
                            id_vendor:  productVendor,
                            vendorName: vendorName,
                            products: [productDetails]
                        }]
                    };

                    Cart(cart).save(function (error) {

                        if(error){
                            return res
                                .status(status.INTERNAL_SERVER_ERROR)
                                .json({error: error.toString()});
                        }

                        let content = { message: 'El carro se ha inicializado' };
                        res.json(content);
                    })
                }
            })
        });
     }
    }));

    // Request headers:  name: x-access-token  value: xxx.xxx.xxx
    api.get('/listClients', auth.verifyToken, wagner.invoke(function (User) {

        return function (req, res) {

            let userRole = req.decoded.role;
            console.log(userRole);

            if(userRole !== 'vendor') {
                return res
                    .status(status.FORBIDDEN)
                    .json({error: 'No tienes la autorizacion para este tipo de peticion'});
            }

            User.find({role: 'client'}).exec(function (error, clients) {

                if(error) {
                    return res
                        .status(status.INTERNAL_SERVER_ERROR)
                        .json({error: error.toString()});
                }

                return res.json(clients);
            })
        }
    }));

    api.get('/listCart', auth.verifyToken, wagner.invoke(function (Cart, Coupon) {

        return function (req, res) {

            let idClient = req.decoded._id;
            //let idClient = req.query.idClient;
            console.log(idClient);

            // todo(r2): persist this value for security purposes
            Cart.findOne({client: idClient}).lean().exec(function (err, cart) {

                if(!cart) {
                    return res.json({error: "el carro esta vacio"});
                }

                let batchLength = cart.batch.length;
                let counter = 0;

                // todo (r2): iterate through an array without "filter".
                // return each vendor in our batch entry
                cart.batch.filter(function (group, index) {

                    let vendor = group.id_vendor;

                    // todo (r2): query all documents to avoid operations on top of an asynchronous call
                    // find the existance of that vendor in the coupon's documents
                    Coupon.find({id_vendor: vendor, clients: idClient}).exec(function (error, coupon) {

                        // todo (r2): add a quantity value
                        // if the response is successful or not, set a new object with a hasCoupon field
                        if (coupon.length > 0) {
                            cart.batch[index].hasCoupon = true;
                        } else {
                            cart.batch[index].hasCoupon = false;
                        }

                        // handle the asynchronous call from Coupon.find()
                        counter++;
                        if(counter === (batchLength)) {
                            return res.json(cart);
                        }
                    });
                });
            });
        }
    }));


    return api;
};
