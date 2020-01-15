const db = require("../../models");
const config = require("../../config/config.json");

const ShopController = {
    //shop information added
    create: async(req, res) => {
        const response = {};
        let { shopName, address, phone,logo} = req.body;
        db.shop.create({
            
            shopName: shopName,
            address: address,
            phone: phone,
            logo: logo,
            
        }).then(ress => {
            response.statusCode = 200;
            response.body = JSON.stringify(
                {
                    message: "Shop added",
                    data: ress
                }
            );
            res.status(response.statusCode).send(response.body);
        }).catch(err => {
            console.log("err", err);
            response.statusCode = 500;
            response.body = JSON.stringify({"errors: ": err});
            res.status(response.statusCode).send(response.body);
        })
    },
    //shop information deleted
    delete: (req, res) => {
        let response = {};
        db.shop.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                message: 'shop deleted',

            });

            res.status(200).send(response.body);

        })
            .catch(err => {
                response.statusCode = 500;
                response.body = JSON.stringify({err});
                res.status(response.statusCode).send(response.body);
            });

    },
    //displaying one shop information by id 
    getOne: (req, res) => {

        const response = {};
        if ("undefined" !== req.params.id) {

            db.shop.findOne({
                attributes: [ 'shopName', 'address', 'phone','logo'],
                where: {id: req.params.id}
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
                response.body = JSON.stringify({err});
                res.status(response.statusCode).send(response.body);
            })
        }
    },
    //displaying all shops information 
    all: (req, res) => {
        let response = {};
        db.shop.findAll({
            attributes: [ 'shopName', 'address', 'phone','logo'],
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
                response.body = JSON.stringify({err});
                res.status(response.statusCode).send(response.body);
            });
    },
    //updating one shop information by id
    update: (req, res) => {
        const response = {};
        let { id } = req.params;
        console.log("id", id);
        try{
        let data = {};
        
        data["shopName"] = req.body.shopName;
        data["address"] = req.body.address;
        data['phone']=req.body.phone;
        data['logo']=req.body.logo;
        db.shop.update(data, {
            where: {
                id
            }
        }).then(data => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                message: 'shop information has been updated',
                data: data

            });
            res.status(response.statusCode).send(response.body);
        })
            .catch(err => {
                response.statusCode = 506;
                response.body = JSON.stringify({err});
                res.status(response.statusCode).send(response.body);
            });
       }catch(err){
        response.statusCode = 500;
        response.body = JSON.stringify({err});
        res.status(response.statusCode).send(response.body);
       }
    }
}
module.exports = ShopController;