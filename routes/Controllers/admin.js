const db = require("../../models");
//const Sequelize = require('sequelize');
//const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const config = require("../../config/config.json");

const AdminController = {
    login: (req, res) => {
        const response = {};
        try {
            let {email, password} = req.body;
            db.admin.findOne({
                where: {email}
            }).then((admin) => {
                if (!admin) {
                    response.statusCode = 404;
                    response.body = JSON.stringify({
                        message: "Incorrect email or doesn't exist",
                        success: false
                    });
                    res.status(response.statusCode).send(response.body);
                }
                else {
                    bcrypt.compare(password, admin.password)
                        .then(valid => {
                            if (!valid) {
                                //throw new Error('No user with that email')
                                response.statusCode = 404;
                                response.body = JSON.stringify({
                                    message: 'Incorrect password',
                                    success: false
                                });
                                res.status(response.statusCode).send(response.body);
                            }
                            else {
                                // signin user and generate a jwt
                                const token = jsonwebtoken.sign({
                                    id: admin.id,
                                    email: admin.email,
                                    role: admin.role,
                                    shopId: admin.shopId
                                }, config.jwt.passPhrase, {expiresIn: '1y'});

                                // return json web token
                                response.statusCode = 200;
                                response.body = JSON.stringify({
                                    message: 'User Logged IN',
                                    success: true,
                                    token: token
                                });
                                res.status(response.statusCode).send(response.body);
                            }
                        })
                }
            })
                .catch(err => {
                    console.log("error", err);
                    response.statusCode = 500;
                    response.body = JSON.stringify({err});
                    res.status(response.statusCode).send(response.body);
                });
        } catch (err) {
            console.log("error", err);
            response.statusCode = 500;
            response.body = JSON.stringify({err});
            res.status(response.statusCode).send(response.body);
        }
    }
};
module.exports = AdminController;