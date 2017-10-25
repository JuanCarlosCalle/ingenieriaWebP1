let express = require('express');
let status = require('http-status');
let auth = require('../middleware/auth');
let upload = require('../config/multer');

module.exports = function (wagner) {

  let api = express.Router();

  api.get('/listProducts', wagner.invoke(function (Product) {

    return function(req, res) {

      Product.find({}).exec( function(err, products){
        if(err) {
          return res
            .status(status.BAD_REQUEST)
            .json({error: err.toString()});
        }

        res.json(products);
      });
    }
  }));
  
  api.get('/listProductsByVendor', auth.verifyToken, wagner.invoke(function (Product) {

      return function (req, res) {

          let userRole = req.decoded.role;
          let id_vendor = req.decoded._id;

          if (userRole !== 'vendor') {
              return res
                  .status(status.FORBIDDEN)
                  .json({error: 'No tienes la autorizacion para este tipo de peticion'});
          }

          Product.find({id_vendor: id_vendor}).exec(function (err, products) {
              if (err) {
                  return res
                      .status(status.INTERNAL_SERVER_ERROR)
                      .json({error: error.toString()});
              }

              return res.json(products);
          })
      }
  }));

  api.post('/postImage', upload.single('photo'), function (req, res) {

      let route = req.file.path;

      // todo: test this case
      if(!route) {
          return res
              .status(status.BAD_REQUEST)
              .json({error: 'No has seleccionado una imagen'});
      }

      return res.json({route: route});
  });

  api.post('/addProduct', auth.verifyToken, wagner.invoke(function (Product) {

      return function (req, res) {

          let reqProduct = req.body.content;
          let userRole = req.decoded.role;
          let id_vendor = req.decoded._id;
          let vendorName = req.decoded.username;

          if (userRole !== 'vendor') {
              return res
                  .status(status.FORBIDDEN)
                  .json({error: 'No tienes la autorizacion para este tipo de peticion'});
          }

          reqProduct.id_vendor = id_vendor;
          reqProduct.vendorName = vendorName;
          console.log(reqProduct);

          Product(reqProduct).save(function (error) {
              if (error) {
                  return res
                      .status(status.INTERNAL_SERVER_ERROR)
                      .json({error: error.toString()});
              }

              let content = {message: 'El producto se ha creado'};
              res.json(content);
          })
      }
  }));

 //localhost:3000/shop/productDetails?id=1
  api.get('/productDetails', wagner.invoke(function(Product) {

      return function(req, res) {

        Product.find({_id: req.query.id}).exec( function(err, productDetail){
           if(err) {
             return res
               .status(status.INTERNAL_SERVER_ERROR)
              .json({error: err.toString()});
          }

          return res.json(productDetail);

        });
      }
    }));

  return api;
};
