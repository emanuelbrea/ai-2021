const jwt = require("jsonwebtoken");
const poolPostgres = require('../dao/dbpool');
/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object|void} response object
 */
exports.verifyToken = async function (req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        const response = {
            success: 'Token no encontrado.',
            message: 'false',
            data: {}
        };
        return res.status(400).send(response);
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET);
        const text = 'SELECT * FROM users WHERE id = $1';
        const {rows} = await poolPostgres.query(text, [decoded.userId]);
        if (!rows[0]) {
            return res.status(400).send({'message': 'The token you provided is invalid'});
        }
        req.user = {id: decoded.userId};
        next();
    } catch (error) {
        return res.status(400).send(error);
    }
}


