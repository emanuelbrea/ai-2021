const controlDao = require("../dao/controlDao");


function Control({
                     fecha,
                     peso,
                     altura,
                     diametro,
                     observaciones,
                     medicamentos,
                     estudios,
                     resultados,
                     id_hijo
                 }) {
    this.fecha = fecha;
    this.peso = peso;
    this.altura = altura;
    this.diametro = diametro;
    this.observaciones = observaciones;
    this.medicamentos = medicamentos;
    this.estudios = estudios;
    this.resultados = resultados;
    this.id_hijo = id_hijo;
}


Control.prototype.createControl = async function () {
    try {
        const {rows} = await controlDao.createControl(this.fecha, this.peso, this.altura, this.diametro,
            this.observaciones, this.medicamentos, this.estudios, this.resultados, this.id_hijo);
        return rows;
    } catch (error) {
        throw error;
    }
};


Control.deleteControl = async function (fecha, medicamentos, estudios, resultados, id_hijo) {
    try {
        const {rows} = await controlDao.deleteControl(fecha, medicamentos, estudios, resultados, id_hijo);
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = Control