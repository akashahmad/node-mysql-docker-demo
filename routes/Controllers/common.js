const db = require("../../models");
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const config = require("../../config/config.json");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const customers = require('./customers');
const CommonController = {
    createShop: async (req, res) => {
        const response = {};
        try {
            //signing up for shops

            let { firstName, lastName, email, password, shopName, address, phone, logo } = req.body;
            db.admin.count({ where: { email: req.body.email } })
                .then(count => {
                    if (count !== 0) {
                        response.statusCode = 409;
                        response.body = JSON.stringify({
                            message: 'Email already Exsist',
                        });
                        res.status(response.statusCode).send(response.body);
                    }
                    else {
                        db.shop.create({
                            shopName,
                            address,
                            phone,
                            logo
                        }).then(shopData => {
                            let encryptedPassword = bcrypt.hashSync(password, 10);
                            db.admin.create({
                                firstName,
                                lastName,
                                email,
                                password: encryptedPassword,
                                role: "admin",
                                shopId: shopData.id
                            }).then(data => {
                                // signin admin and generate a jwt
                                const token = jsonwebtoken.sign({
                                    id: data.id,
                                    email: data.email,
                                    role: data.role,
                                    shopId: data.shopId
                                }, config.jwt.passPhrase, { expiresIn: '1y' });
                                let finalResponse = {
                                    admin: {
                                        firstName: data.firstName,
                                        lastName: data.lastName,
                                        email: data.email
                                    },
                                    shop: {
                                        shopName: data.shopName,
                                        address: data.address,
                                        phone: data.phone,
                                        logo: data.logo
                                    },
                                    token
                                };
                                response.statusCode = 200;
                                response.body = JSON.stringify({
                                    message: 'New Admin Created',
                                    data: finalResponse,
                                    token: token
                                });
                                res.status(response.statusCode).send(response.body);
                            })
                                .catch(err => {
                                    response.statusCode = 500;
                                    response.body = JSON.stringify({ err });
                                    res.status(response.statusCode).send(response.body);
                                });
                        })
                            .catch(err => {
                                response.statusCode = 500;
                                response.body = JSON.stringify({ err });
                                res.status(response.statusCode).send(response.body);
                            });
                    }
                });
        } catch (err) {
            console.log("err", err);
            response.statusCode = 500;
            response.body = await JSON.stringify(err);
            await res.status(response.statusCode).end(response.body);
        }
    },
    dashboard: async (req, res) => {
        const response = {};
        try {
            let { shopId } = req.decoded;
            db.customers.count({ where: { shopId: shopId } })
                .then(count => {
                    db.money.sum("amount", {
                        where: { [Op.and]: [{ status: 'sent' }, { currency: 'PKR' }] }
                    }).then(totalPKRSent => {
                        db.money.sum("amount", {
                            where: { [Op.and]: [{ status: 'received' }, { currency: 'PKR' }] }
                        }).then(totalPKRReceived => {
                            db.money.sum("amount", {
                                where: { [Op.and]: [{ status: 'sent' }, { currency: 'USD' }] }
                            })
                                .then(totalUSDSent => {
                                    db.money.sum("amount", {
                                        where: { [Op.and]: [{ status: 'received' }, { currency: 'USD' }] }
                                    }).then(totalUSDReceived => {
                                        db.money.sum("amount", {
                                            where: { [Op.and]: [{ status: 'sent' }, { currency: 'AFGHANI' }] }
                                        }).then(totalAfghaniSent => {
                                            db.money.sum("amount", {
                                                where: { [Op.and]: [{ status: 'received' }, { currency: 'AFGHANI' }] }
                                            }).then(totalAfghaniReceived => {
                                                response.statusCode = 200;
                                                response.body = JSON.stringify({
                                                    message: 'Dashboard call response',
                                                    success: true,
                                                    totalCustomers: count,
                                                    totalPKRSent: totalPKRSent,
                                                    totalPKRReceived: totalPKRReceived,
                                                    totalUSDSent: totalUSDSent,
                                                    totalUSDReceived: totalUSDReceived,
                                                    totalAfghaniSent: totalAfghaniSent,
                                                    totalAfghaniReceived: totalAfghaniReceived,
                                                });
                                                res.status(response.statusCode).send(response.body);
                                            })
                                        })
                                    })

                                })
                        })
                    });
                })
        } catch (err) {
            console.log("err", err);
            response.statusCode = 500;
            response.body = await JSON.stringify(err);
            await res.status(response.statusCode).end(response.body);
        }
        console.log('ok i show totalCustomers ');


    },
    validateToken: async (req, res) => {
        let response = {};
        response.statusCode = 200;
        response.body = JSON.stringify({
            success: true,
        });
        res.status(response.statusCode).send(response.body);
    },
    adminSettings: async (req, res) => {
        const response = {};
        try {
            // adminSettings
            let { shopId } = req.decoded;
            let { id } = req.params;
            console.log("id", id);
            let adminData = {};
            adminData["firstName"] = req.body.firstName;
            adminData["lastName"] = req.body.lastName;
            adminData["email"] = req.body.email;
            adminData["password"] = req.body.password;

            db.admin.update(adminData, {
                where: {
                      id: req.params.id 
                },
            })
                .then(adminData => {
                    shopData = {};
                    shopData["shopName"] = req.body.shopName;
                    shopData["address"] = req.body.address;
                    shopData["phone"] = req.body.phone;
                    db.shop.update(shopData, {
                        where: {
                            id: req.params.id 
                      },
                    }).then(shopData => {

                        response.statusCode = 200;
                        response.body = JSON.stringify({
                            message: ' Admin updated ',
                            adminData: adminData,
                            shopData: shopData

                        });
                        res.status(response.statusCode).send(response.body);
                    })
                        .catch(err => {
                            response.statusCode = 500;
                            response.body = JSON.stringify({ err });
                            res.status(response.statusCode).send(response.body);
                        });
                })
                .catch(err => {
                    response.statusCode = 500;
                    response.body = JSON.stringify({ err });
                    res.status(response.statusCode).send(response.body);
                });

        } catch (err) {
            console.log("err", err);
            response.statusCode = 500;
            response.body = await JSON.stringify(err);
            await res.status(response.statusCode).end(response.body);
        }
    },




    adminName: (req, res) => {
        try {
            let response = {};
            if ("undefined" !== req.params.id) {
            db.admin.findOne({
                attributes: ['firstName', 'lastName', 'email', 'password'],
                where: {id: req.params.id}
            }).then(data => {

                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: 'ok',
                    data: data
                });
                res.status(response.statusCode).send(response.body);

            })
                .catch(err => {
                    response.statusCode = 500;
                    response.body = JSON.stringify({ err });
                    res.status(response.statusCode).send(response.body);
                });
            }
        } catch (err) {
            console.log("err", err);
            response.statusCode = 500;
            response.body = JSON.stringify(err);
            res.status(response.statusCode).end(response.body);
        }
    },


};
module.exports = CommonController;