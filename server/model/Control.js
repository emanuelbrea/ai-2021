const controlDao = require("../dao/controlDao");


function Control({
                     fecha,
                     peso,
                     altura,
                     diametro,
                     observaciones,
                     medicamentos,
                     dosis,
                     periodo,
                     estudios,
                     resultados,
                     nombre_hijo,
                     padre
                 }) {
    this.fecha = fecha;
    this.peso = peso;
    this.altura = altura;
    this.diametro = diametro;
    this.observaciones = observaciones;
    this.medicamentos = medicamentos;
    this.dosis = dosis;
    this.periodo = periodo;
    this.estudios = estudios;
    this.resultados = resultados;
    this.nombre_hijo = nombre_hijo;
    this.padre = padre;
}


Control.prototype.createControl = async function () {
    try {
        const {rows} = await controlDao.createControl(this.fecha, this.peso, this.altura, this.diametro,
            this.observaciones, this.medicamentos, this.dosis, this.periodo, this.estudios, this.resultados,
            this.nombre_hijo, this.padre);
        return rows;
    } catch (error) {
        throw error;
    }
};


Control.deleteControl = async function (fecha, medicamentos, estudios, resultados, nombre_hijo, padre) {
    try {
        const {rows} = await controlDao.deleteControl(fecha, medicamentos, estudios, resultados, nombre_hijo, padre);
        return rows;
    } catch (error) {
        throw error;
    }
};

Control.getControls = async function (padre) {
    try {
        const {rows} = await controlDao.getControls(padre);
        return rows;
    } catch (error) {
        throw error;
    }
};

Control.editControls = async function (fecha, peso, altura, diametro, observaciones, medicamentos, dosis, periodo,
                                       estudios, resultados, nombre_hijo, fecha_old, medicamentos_old, estudios_old,
                                       resultados_old, nombre_hijo_old, padre) {
    try {
        const {rows} = await controlDao.editControl(
            fecha, peso, altura, diametro, observaciones, medicamentos, dosis, periodo, estudios, resultados,
            nombre_hijo, fecha_old, medicamentos_old, estudios_old, resultados_old, nombre_hijo_old, padre);
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = Control