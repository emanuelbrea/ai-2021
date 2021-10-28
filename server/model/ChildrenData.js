const childrenDao = require("../dao/childrenDataDao");


function ChildrenData({
                          descripcion,
                          tipo,
                          nombre_hijo,
                          padre
                      }) {
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.nombre_hijo = nombre_hijo;
    this.padre = padre;
}


ChildrenData.prototype.createChildrenData = async function () {
    try {
        const {rows} = await childrenDao.createChildrenData(this.descripcion, this.tipo, this.nombre_hijo, this.padre);
        return rows;
    } catch (error) {
        throw error;
    }
};


ChildrenData.deleteChildrenData = async function (descripcion, tipo, nombre_hijo, padre) {
    try {
        const {rows} = await childrenDao.deleteChildrenData(descripcion, tipo, nombre_hijo, padre);
        return rows;
    } catch (error) {
        throw error;
    }
};

ChildrenData.getChildrenData = async function (nombre_hijo, padre) {
    try {
        const {rows} = await childrenDao.getChildrenData(nombre_hijo, padre);
        return rows;
    } catch (error) {
        throw error;
    }
};


ChildrenData.editChildrenData = async function (descripcion, descripcion_old, tipo, nombre_hijo, padre) {
    try {
        const {rows} = await childrenDao.editChildrenData(descripcion, descripcion_old, tipo, nombre_hijo, padre);
        return rows;
    } catch (error) {
        throw error;
    }
};


module.exports = ChildrenData