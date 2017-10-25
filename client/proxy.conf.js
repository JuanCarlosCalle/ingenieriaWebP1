const PROXY_CONFIG = [
  {
    "context": [
      "/vendor/assignCoupon",
      "/shop/listProducts",
      "/shop/addProduct",
      "/shop/postImage",
      "/shop/listProductsByVendor",
      "/client/addToCart",
      "/client/listClients",
      "/client/listCart",
      "/user/login"
    ],
    "target": "http://localhost:3000",
    "secure": false
  }
];

module.exports = PROXY_CONFIG;

