let express = require('express');
let status = require('http-status');

module.exports = function (wagner) {

    let api = express.Router();

    api.post('/registerUser', wagner.invoke(function(User){
        return function(req, res) {
            let reqClient= req.body;
            User(reqClient).save(function(error) {
                if(error) {
                    return res
                        .status(status.INTERNAL_SERVER_ERROR)
                        .json({error: error.toString()});
                }
                let content = { message: 'Se registró exitosamente el cliente'};
                res.json(content);
            })

        }
    }));

    api.post('/login', wagner.invoke(function (User) {

        return function (req, res) {

            let reqAccess = req.body;

            User.findOne({
                    username: reqAccess.username,
                    password: reqAccess.password
                },
                function (err, user) {

                    if(err){
                        return res
                            .status(status.INTERNAL_SERVER_ERROR)
                            .json({error: error.toString()});
                    }

                    if(!user){
                        let content = { message: 'Incorrect username or password' };
                        return res
                            .status(status.UNAUTHORIZED)
                            .json(content);
                    }

                    let token = user.generateJwt();
                    let content = {
                        user: user.username,
                        id: user._id,
                        role: user.role,
                        token: token
                    };
                    res.json(content);
                })
        }
    }));

    return api;
};
