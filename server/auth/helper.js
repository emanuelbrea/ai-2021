const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */
exports.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}


/**
 * comparePassword
 * @param {string} hashPassword
 * @param {string} password
 * @returns {Boolean} return True or False
 */
exports.comparePassword= function(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
}


/**
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */
exports.isValidEmail= function(email) {
    return /\S+@\S+\.\S+/.test(email);
}


/**
 * Gnerate Token
 * @param {string} id
 * @returns {string} token
 */
exports.generateToken= function(id) {
    const token = jwt.sign({
            userId: id
        },
        process.env.SECRET, { expiresIn: '7d' }
    );
    return token;
}
