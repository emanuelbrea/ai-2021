const childrenDao = require("../dao/childrenDao");


function Children({
                      nombre,
                      nacimiento,
                      grupoSanguineo,
                      padre
                  }) {
    this.nombre = nombre;
    this.nacimiento = nacimiento;
    this.grupoSanguineo = grupoSanguineo;
    this.padre = padre;
}


Children.prototype.createChildren = async function () {
    try {
        const {rows} = await childrenDao.createChildren(this.nombre, this.nacimiento, this.grupoSanguineo, this.padre);
        return rows;
    } catch (error) {
        throw error;
    }
};


Children.deleteChildren = async function (nombre, padre) {
    try {
        const {rows} = await childrenDao.deleteChildren(nombre, padre);
        return rows;
    } catch (error) {
        throw error;
    }
};

Children.getChildren = async function (padre) {
    try {
        const {rows} = await childrenDao.getChildren(padre);
        return rows;
    } catch (error) {
        throw error;
    }
};

Children.editChildren = async function (nombre, nacimiento, grupoSanguineo, nombre_old, nacimiento_old, padre) {
    try {
        const {rows} = await childrenDao.editChildren(
            nombre, nacimiento, grupoSanguineo, nombre_old, nacimiento_old, padre);
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = Children