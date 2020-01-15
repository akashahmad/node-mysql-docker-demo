let jwt = require('jsonwebtoken');
const config = require('../config/config.json');

let verifyToken = async (req, res, next) => {
    const response = {};
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token) {
            if (await token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = await token.slice(7, token.length);
            }
            await jwt.verify(token, config.jwt.passPhrase, async (err, decoded) => {
                console.log(err, decoded);
                if (err) {
                    response.statusCode = 401;
                    response.body = JSON.stringify({
                        message: 'Token is not valid',
                        success: false
                    });
                    await res.status(response.statusCode).send(response.body);
                } else {
                    req.decoded = await decoded;
                    await next();
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    }
    catch (err) {
        response.statusCode = 505;
        response.body = JSON.stringify({err});
        res.status(response.statusCode).end(response.body);
    }

};

module.exports = verifyToken;