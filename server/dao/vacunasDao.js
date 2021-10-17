const poolPostgres = require('../dao/dbpool');

const queryCreateVacuna = `INSERT INTO vacunas(fecha, vacuna, lugar, nombre_hijo, padre) 
VALUES ($1, $2, $3, $4, $5) RETURNING *`

const queryDeleteVacuna = `DELETE FROM vacunas WHERE fecha= $1 and vacuna =$2 and nombre_hijo=$3 RETURNING *`

const queryGetVacunas = `SELECT * FROM vacunas WHERE padre=$1`

const queryEditVacunas = `UPDATE vacunas SET fecha=$1, vacuna =$2, lugar=$3, nombre_hijo=$4 
where fecha= $5 and vacuna =$6 and nombre_hijo=$7 and padre=$8 RETURNING *`


exports.createVacuna = function (fecha, vacuna, lugar, nombre_hijo, padre) {
    return poolPostgres.query(queryCreateVacuna,
        [fecha, vacuna, lugar, nombre_hijo, padre]
    );
}

exports.deleteVacuna = function (fecha, vacuna, nombre_hijo, padre) {
    return poolPostgres.query(queryDeleteVacuna,
        [fecha, vacuna, nombre_hijo, padre]
    );
}

exports.getVacunas = function (padre) {
    return poolPostgres.query(queryGetVacunas,
        [padre]
    );
}

exports.editVacuna = function (fecha, vacuna, lugar, nombre_hijo, fecha_old, vacuna_old, nombre_hijo_old, padre) {
    return poolPostgres.query(queryEditVacunas,
        [fecha, vacuna, lugar, nombre_hijo, fecha_old, vacuna_old, nombre_hijo_old, padre]
    );
}

