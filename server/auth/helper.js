const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */
exports.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}


/**
 * comparePassword
 * @param {string} hashPassword
 * @param {string} password
 * @returns {Boolean} return True or False
 */
exports.comparePassword = function (hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
}


/**
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */
exports.isValidEmail = function (email) {
    return /\S+@\S+\.\S+/.test(email);
}


/**
 * Generate Token
 * @param {string} id
 * @returns {string} token
 */
exports.generateToken = function (id) {
    const token = jwt.sign({
            userId: id
        },
        process.env.SECRET, {expiresIn: '1d'}
    );
    return token;
}


exports.generateCodigo = function () {
    const max = 1000000;
    const min = 100000;
    return Math.floor(
        Math.random() * (max - min) + min
    )
}


exports.sendEmail = async function (nombre, codigo) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.TO,
                pass: process.env.EMAILPASSWORD,
            },
        });

        const template = "./template/requestResetPassword.handlebars";
        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);

        const mailOptions = {
            from: process.env.SENDER,
            to: process.env.TO,
            subject: "Papis Felices - Resetear contraseña",
            html: compiledTemplate({name: nombre, codigo: codigo,}),
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return -1;
            } else {
                return 1;
            }
        });
    } catch (error) {
        return error;
    }
};

exports.addChildren = function (children) {
    const result = [];
    for (let i = 0; i < children.length; i++) {
        result.push(children[i].nombre);
    }
    return result;
}