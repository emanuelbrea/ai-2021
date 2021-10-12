const vacunaDao = require("../dao/vacunasDao");


function Vacuna({
                    fecha,
                    vacuna,
                    lugar,
                    nombre_hijo,
                    padre
                }) {
    this.fecha = fecha;
    this.vacuna = vacuna;
    this.lugar = lugar;
    this.nombre_hijo = nombre_hijo;
    this.padre = padre;
}


Vacuna.prototype.createVacuna = async function () {
    try {
        const {rows} = await vacunaDao.createVacuna(this.fecha, this.vacuna, this.lugar, this.nombre_hijo, this.padre);
        return rows;
    } catch (error) {
        throw error;
    }
};


Vacuna.deleteVacuna = async function (fecha, vacuna, nombre_hijo, padre) {
    try {
        const {rows} = await vacunaDao.deleteVacuna(fecha, vacuna, nombre_hijo, padre);
        return rows;
    } catch (error) {
        throw error;
    }
};

Vacuna.getVacunas = async function (padre) {
    try {
        const {rows} = await vacunaDao.getVacunas(padre);
        return rows;
    } catch (error) {
        throw error;
    }
};

Vacuna.editVacuna = async function (fecha, vacuna, lugar, nombre_hijo, fecha_old, vacuna_old, nombre_hijo_old, padre) {
    try {
        const {rows} = await vacunaDao.editVacuna(
            fecha, vacuna, lugar, nombre_hijo, fecha_old, vacuna_old, nombre_hijo_old, padre);
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = Vacuna