let express = require('express');
let status = require('http-status');
let auth = require('../middleware/auth');

module.exports = function (wagner) {

  let api = express.Router();

  api.post('/assignCoupon', auth.verifyToken, wagner.invoke(function(Coupon) {
      return function(req, res) {

            let clientsArray = req.body.clients;
            let userRole = req.decoded.role;
            let idVendor = req.decoded._id;

            // todo: remove duplicate code
            if (userRole !== 'vendor') {
              return res
                  .status(status.FORBIDDEN)
                  .json({error: 'No tienes la autorizacion para este tipo de peticion'});
            }

            Coupon.findOne({id_vendor: idVendor}).exec(function(err, coupon) {
                if (coupon) {

                    // todo(r2): add a quantity value for users with a coupon from the same vendor
                    Coupon.findOneAndUpdate({id_vendor: idVendor},{ $push: { clients: {$each:clientsArray}}}, function(error) {
                          if (error) {
                              return res
                                  .status(status.INTERNAL_SERVER_ERROR)
                                  .json({
                                      error: error.toString()
                                  });
                          }
                          let content = {
                              message: 'Los cupones se agregaron correctamente'
                          };
                          res.json(content);

                      });

                } else {
                    let coupon = {"id_vendor": idVendor,"clients": clientsArray};
                    Coupon.create(coupon,function(error) {
                            if (error) {
                                return res
                                    .status(status.INTERNAL_SERVER_ERROR)
                                    .json({error: error.toString()}
                                  );
                            }
                            let content = { message: 'El cupón se agregó correctamente'};
                            res.json(content);
                    });
                }
            })
          }
  }));

  return api;
};
