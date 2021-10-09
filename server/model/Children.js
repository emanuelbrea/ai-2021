const childrenDao = require("../dao/childrenDao");


function Children({
                      nombre,
                      nacimiento,
                      grupoSanguineo,
                      alergias,
                      enfermedades,
                      padre
                  }) {
    this.nombre = nombre;
    this.nacimiento = nacimiento;
    this.grupoSanguineo = grupoSanguineo;
    this.alergias = alergias;
    this.enfermedades = enfermedades;
    this.padre = padre;
}


Children.prototype.createChildren = async function () {
    try {
        const {rows} = await childrenDao.createChildren(this.nombre, this.nacimiento, this.grupoSanguineo,
            this.alergias, this.enfermedades, this.padre);
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

module.exports = Children