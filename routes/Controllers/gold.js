const db = require("../../models");

const config = require("../../config/config.json");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const GoldController = {
    //creating gold information
    create: async (req, res) => {

        const response = {};
        try {
            let { shopId } = req.decoded;
            let { customerId, particular, billNo, status, purity, grossWeight, pureWeight, transactionDate } = req.body;
            db.gold.create({
                where: { [Op.and]: [{ customerId: req.params.customerId }, { shopId: shopId }] },
                shopId: shopId,
                customerId: customerId,
                billNo: billNo,
                particular: particular,
                status: status,
                purity: purity,
                grossWeight: grossWeight,
                pureWeight: pureWeight,
                transactionDate: transactionDate,


            }).then(ress => {
                response.statusCode = 200;
                response.body = JSON.stringify(
                    {
                        message: "gold details added",
                        data: ress
                    }
                );
                res.status(response.statusCode).send(response.body);

            }).catch(err => {
                console.log("error", err);
                response.statusCode = 404;
                response.body = JSON.stringify({ "errors: ": err });
                res.status(response.statusCode).send(response.body);
            })
        }
        catch (err) {
            console.log("error", err);
            response.statusCode = 500;
            response.body = JSON.stringify({ "errors: ": err });
            res.status(response.statusCode).send(response.body);
        }
    },
    //deleting gold information
    delete: async (req, res) => {
        let response = {};
        let { shopId } = req.decoded;
        db.gold.destroy({
            where: {
                [Op.and]: [{ id: req.params.id }, { shopId: shopId }]
            },




        }).then(() => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                message: 'gold details deleted',

            });
            res.status(response.statusCode).send(response.body);
            console.log(id);
        })
            .catch(err => {
                response.statusCode = 500;
                response.body = JSON.stringify({ err });
                res.status(response.statusCode).send(response.body);
            });

    },

    //getting gold information
    all: async (req, res) => {
        let { shopId } = req.decoded;
        let { page, limit } = req.query;
        page = parseInt(page);         //pagination 
        limit = parseInt(limit);
        let response = {};
        db.gold.findAndCountAll({

            where: { [Op.and]: [{ customerId: req.params.customerId }, { shopId: shopId }] },

            attributes: ['id', 'shopId', 'customerId', 'particular', 'billNo', "status", 'purity', 'grossWeight', 'pureWeight', 'transactionDate'],

            offset: page === 1 ? (page - 1) * limit : limit == 5, //declaring offset
            limit: limit
        }).then(result => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                success: true,
                gold: result.rows,
                totalgold: result.count,
                totalPages: (parseInt((result.count / limit)) + 1),    //no of total pages
                currentPage: page
            });
            res.status(response.statusCode).send(response.body);

        })
            .catch(err => {
                response.statusCode = 500;
                response.body = JSON.stringify({ err });
                res.status(response.statusCode).send(response.body);
                console.log(err);
            });


    },
    //updating gold information against a user
    update: async (req, res) => {
        let { shopId } = req.decoded;
        const response = {};
        let { id } = req.params;
        console.log("id", id);
        try {
            let data = {};

            data["customerId"] = req.body.customerId;
            data["billNo"] = req.body.billNo;
            data["particular"] = req.body.particular;
            data["status"] = req.body.status;
            data["detail"] = req.body.detail;
            data["grossWeight"] = req.body.grossWeight;
            data["pureWeight"] = req.body.pureWeight;
            data["transactionDate"] = req.body.transactionDate;

            db.gold.update(data, {
                where: {
                    [Op.and]: [{ id: req.params.id }, { shopId: shopId }]
                },
            }).then(data => {
                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: 'gold details has been updated',
                    data: data

                });
                res.status(response.statusCode).send(response.body);

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

    }
}
module.exports = GoldController;