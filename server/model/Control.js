const controlDao = require("../dao/controlDao");


function Control({
                     id,
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
    this.id = id;
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
        const {rows} = await controlDao.createControl(this.id, this.fecha, this.peso,
            this.altura, this.diametro, this.observaciones, this.medicamentos, this.estudios, this.resultados, this.id_hijo);
        return rows;
    } catch (error) {
        throw error;
    }
};


Control.deleteControl = async function (id, id_hijo) {
    try {
        const {rows} = await controlDao.deleteControl(id, id_hijo);
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = Control