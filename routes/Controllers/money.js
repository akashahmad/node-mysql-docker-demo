const db = require("../../models");

const config = require("../../config/config.json");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const MoneyController = {
    //money information added
    create: (req, res) => {
        const response = {};
        let { shopId } = req.decoded;
        let { customerId, billNo, amount, status, currency, detail, transactionDate } = req.body;
        db.money.create({
            where: {
                [Op.and]: [{ customerId: req.params.customerId }, { shopId: shopId }]
            },
            customerId: customerId,
            shopId: shopId,
            billNo: billNo,
            amount: amount,
            status: status,
            currency: currency,
            detail: detail,
            transactionDate: transactionDate,

        }).then(ress => {
            response.statusCode = 200;
            response.body = JSON.stringify(
                {
                    message: "transactions details added",
                    data: ress
                }
            );
            res.status(response.statusCode).send(response.body);

        }).catch(err => {
            console.log("error", err);
            response.statusCode = 500;
            response.body = JSON.stringify({ "errors: ": err });
            res.status(response.statusCode).send(response.body);
        })
    },
    //money information deleted
    delete: (req, res) => {
        let { shopId } = req.decoded;
        let response = {};
        db.money.destroy({
            where: {
                [Op.and]: [{ id: req.params.id }, { shopId: shopId }]
            }
        }).then(() => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                message: 'transactions details  deleted',

            });
            res.status(response.statusCode).send(response.body);

        })
            .catch(err => {
                response.statusCode = 500;
                response.body = JSON.stringify({ err });
                res.status(response.statusCode).send(response.body);
            });

    },

    //all money information 
    all: (req, res) => {
        let { shopId } = req.decoded;
        let { page, limit } = req.query;
        page = parseInt(page);         //pagination 
        limit = parseInt(limit);
        let response = {};
        db.money.findAndCountAll({

            where: { [Op.and]: [{ customerId: req.params.customerId }, { shopId: shopId }] },

            attributes: ['id', 'customerId', 'billNo', 'amount', 'status', 'detail', 'currency', 'transactionDate', 'shopId'],
            offset: page === 1 ? (page - 1) * limit : limit == 5, //declaring offset
            limit: limit
        }).then(result => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                success: true,
                money: result.rows,
                totalmoney: result.count,
                totalPages: (parseInt((result.count / limit)) + 1),    //no of total pages
                currentPage: page
            });
            res.status(response.statusCode).send(response.body);

        })
            .catch(err => {
                response.statusCode = 500;
                response.body = JSON.stringify({ err });
                res.status(response.statusCode).send(response.body);
            });

    },
    //money information updated
    update: (req, res) => {
        let { shopId } = req.decoded;
        const response = {};
        let { customerId } = req.params;
        console.log("id", customerId);


        try {
            let data = {};
            data["customerId"] = req.body.customerId;
            data["billNo"] = req.body.billNo;
            data["amount"] = req.body.amount;
            data["status"] = req.body.status;
            data["currency"] = req.body.currency;
            data["detail"] = req.body.detail;
            data["transactionDate"] = req.body.transactionDate;


            db.money.update(data, {
                where: {
                    [Op.and]: [{ id: req.params.id }, { shopId: shopId }]
                }
            }).then(data => {
                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: 'transactions details has been updated',
                    data: data

                });
                res.status(response.statusCode).send(response.body);

            })
                .catch(err => {
                    response.statusCode = 500;
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
module.exports = MoneyController;