let wagner = require('wagner-core');
require('../models/models')(wagner);

module.exports = function (app) {

  app.use('/shop', require('../routes/shop')(wagner));
  app.use('/client', require('../routes/client')(wagner));
  app.use('/vendor', require('../routes/vendor')(wagner));
  app.use('/user', require('../routes/user')(wagner))
};
