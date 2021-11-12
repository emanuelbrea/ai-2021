const codigoDao = require('../dao/codigoDao')

function Codigo({
                    email,
                    codigo
                }) {
    this.email = email;
    this.codigo = codigo;
}


Codigo.prototype.createCodigo = async function () {
    try {
        await Codigo.borrarCodigo(this.email);
        const {rows} = await codigoDao.createCodigo(this.email, this.codigo);
        return rows;
    } catch (error) {
        throw error;
    }
};

Codigo.borrarCodigo = async function (email) {
    try {
        const {rows} = await codigoDao.deleteCodigo(email);
        return rows;
    } catch (error) {
        throw error;
    }
};

Codigo.verifyCodigo = async function (email, codigo) {
    try {
        const {rows} = await codigoDao.verifyCodigo(email, codigo);
        return rows;
    } catch (error) {
        throw error;
    }
};


module.exports = Codigo