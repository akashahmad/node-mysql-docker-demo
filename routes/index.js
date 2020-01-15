const cors = require('cors');
const bodyParser = require('body-parser');
//route controller
const customers = require('./Controllers/customers');
const gold = require('./Controllers/gold');
const commonController = require('./Controllers/common');
const commonBLL = require('./BLL/commonBLL');
const adminBLL = require('./BLL/adminBLL');
const money = require('./Controllers/money');
const shop = require('./Controllers/shop.js');
const admin = require('./Controllers/admin');

// utils
const verifyToken = require('../util/verifyToken');

exports = module.exports = (app) => {
    try {
        // middlewares
        //bodyParser as a parsing middleware
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        //CORS
        app.use(cors());

        // middleware to use for all requests
        // app.use(function (req, res, next) {
        //     console.log('middleware going on...');
        //     next();
        // });
        // Test server is runing endpoint
        app.get("/", (req, res) => {
            res.end("ok")
        });

        // create shop, create admin
        app.post("/api/createShop/:token", commonBLL.validateFields, commonController.createShop);
        // token validator
        app.get("/api/validate-token", verifyToken, commonController.validateToken);
        // admin login
        app.post('/api/login', adminBLL.validateLoginFields, admin.login);

        // admin dashboard
        app.get('/api/dashboard', verifyToken, commonController.dashboard);
        //customercall
        app.get('/api/customerCall/:id', verifyToken, customers.customercall);

        // customers crud
        app.get('/api/customers', verifyToken, customers.all);
        app.get('/api/allcustomers', verifyToken, customers.allcustomers);
        app.post('/api/customers', verifyToken, customers.create);
        app.delete('/api/customers/:id', verifyToken, customers.delete);
        app.get('/api/customers/:id', verifyToken, customers.getOne);
        app.put('/api/customers/:id', verifyToken, customers.update);

        //gold crud
        app.get('/api/gold/:customerId', verifyToken, gold.all);
        app.post('/api/gold', verifyToken, gold.create);
        app.delete('/api/gold/:id', verifyToken, gold.delete);
        app.put('/api/gold/:id', verifyToken, gold.update);
        //money crud  
        app.get('/api/money/:customerId', verifyToken, money.all);
        app.post('/api/money', verifyToken, money.create);
        app.delete('/api/money/:id', verifyToken, money.delete);
        app.put('/api/money/:id', verifyToken, money.update);
        //shop crud
        app.get('/api/adminname/:id', verifyToken, commonController.adminName);
        app.put('/api/adminSettings/:id', verifyToken,commonController.adminSettings);
    } catch (e) {
        console.log("across api catch err", e);
    }
};