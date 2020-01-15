const db = require("../../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config = require("../../config/config.json");

const CustomersController = {


    //creating customers 
    create: async (req, res) => {
        const response = {};
        let { fullName, address, phone } = req.body;
        let { shopId, id: adminId } = req.decoded;
        db.customers.create({
            
            fullName: fullName,
            address: address,
            phone: phone,
            shopId: shopId,
            addedByAdminId: adminId,
        }).then(async ress => {
            response.statusCode = 200;
            response.body = JSON.stringify(
                {
                    message: "Customer added",
                    data: ress
                }
            );
            await res.status(response.statusCode).send(response.body);
        }).catch(err => {
            console.log("err", err);
            response.statusCode = 500;
            response.body = JSON.stringify({ "errors: ": err });
            res.status(response.statusCode).send(response.body);
        })
    },
    //deleting one customer details by id
    delete: async (req, res) => {
        let response = {};
        db.customers.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                message: 'Customer deleted',

            });

            res.status(200).send(response.body);

        })
            .catch(err => {
                response.statusCode = 500;
                response.body = JSON.stringify({ err });
                res.status(response.statusCode).send(response.body);
            });

    },
    //getting one customer details by id
    getOne: async (req, res) => {
        let { shopId } = req.decoded;
        const response = {};
        if ("undefined" !== req.params.id) {

            db.customers.findOne({
                attributes: ['fullName', 'address', 'phone', 'shopId', 'addedByAdminId'],
                where: { [Op.and]: [{ id: req.params.id }, { shopId: shopId }] }
            }).then(data => {
                response.statusCode = 200;
                response.body = JSON.stringify(
                    {
                        message: "ok",
                        data: data
                    }
                );
                res.status(response.statusCode).send(response.body);

            }).catch(err => {
                console.log("error", err);
                response.statusCode = 500;
                response.body = JSON.stringify({ err });
                res.status(response.statusCode).send(response.body);
            })
        }
    },
    //getting  all customers 
    all: async (req, res) => {
        let { page, limit } = req.query;
        page = page ? parseInt(page) : 1;         //pagination
        limit = limit ? parseInt(limit) : 10;
        let response = {};
        db.customers.findAndCountAll({
            where: {
                shopId: req.decoded.shopId
            },
            order: [['id', 'ASC']], // sorting fields by ascending and descending order
            offset: (page - 1) * limit, //declaring offset
            limit: limit
        }).then(async result => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                success: true,
                customers: await result.rows,
                totalCustomers: await result.count,
                totalPages: await (parseInt((result.count / limit)) + 1),    //no of total pages
                currentPage: await page
            });
            res.status(response.statusCode).send(response.body);
        })
            .catch(err => {
                response.statusCode = 500;
                response.body = JSON.stringify({ err });
                res.status(response.statusCode).send(response.body);
            });
        // await console.log("decone", res.decoded);
        // await res.json(req.decoded);
    },
    //updating information of a customer by id
    update: async (req, res) => {
        const response = {};

        let {id} = req.params;

        try {
            let data = {};
            data["fullName"] = req.body.fullName;
            data["address"] = req.body.address;
            data["phone"] = req.body.phone;

            await db.customers.update(data, {
                where: {
                    id
                }
            }).then(async data => {
                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: 'Customer has been updated',
                    data: data

                });
                await res.status(response.statusCode).send(response.body);
            })
                .catch(err => {
                    response.statusCode = 506;
                    response.body = JSON.stringify({ err });
                    res.status(response.statusCode).send(response.body);
                });
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({ err });
            res.status(response.statusCode).send(response.body);
        }
    },
    customercall: async (req, res) => {
        const response = {};
        try {
            let {id} = req.params;
            let {shopId} = req.decoded;
            db.customers.findOne({where: {[Op.and]: [{id: id}, {shopId: shopId}]}})
           
                .then(customer => {
                    response.statusCode = 200;
                    response.body = JSON.stringify({
                        message: 'Customer info response',
                        success: true,
                        customerInfo: customer,

                    });
                    res.status(response.statusCode).send(response.body);
                    console.log(id);

                })
        }
        catch (err) {
            console.log("err", err);
            response.statusCode = 500;
            response.body = await JSON.stringify(err);
            await res.status(response.statusCode).end(response.body);
        }
        console.log(err);


    },
    allcustomers: async (req, res) => {
        let { page, limit } = req.query;
        page = page ? parseInt(page) : 1;         //pagination
        limit = limit ? parseInt(limit) : 50;
        let response = {};
        db.customers.findAndCountAll({
            where: {
                shopId: req.decoded.shopId
            },
            order: [['id', 'ASC']], // sorting fields by ascending and descending order
            offset: (page - 1) * limit, //declaring offset
            limit: limit
        }).then(async result => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                success: true,
                customers: await result.rows,
                totalCustomers: await result.count,
                totalPages: await (parseInt((result.count / limit)) + 1),    //no of total pages
                currentPage: await page
            });
            res.status(response.statusCode).send(response.body);
        })
            .catch(err => {
                response.statusCode = 500;
                response.body = JSON.stringify({ err });
                res.status(response.statusCode).send(response.body);
            });
        // await console.log("decone", res.decoded);
        // await res.json(req.decoded);
    },
}
module.exports = CustomersController;