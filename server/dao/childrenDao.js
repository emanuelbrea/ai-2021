const poolPostgres = require('../dao/dbpool');

const queryCreateChildren = `INSERT INTO children(nombre, nacimiento, grupo_sanguineo, padre) 
VALUES ($1, $2, $3, $4) RETURNING *`

const queryDeleteChildren = `DELETE FROM children WHERE nombre= $1 and padre =$2`

const queryGetChildren = `SELECT * FROM children WHERE padre =$1`

const queryEditChildren = `UPDATE children SET nombre=$1, nacimiento=$2, grupo_sanguineo=$3 
WHERE nombre=$4 and nacimiento=$5 and padre =$6`


exports.createChildren = function (nombre, nacimiento, grupoSanguineo, padre) {
    return poolPostgres.query(queryCreateChildren,
        [nombre, nacimiento, grupoSanguineo, padre]
    );
}

exports.deleteChildren = function (nombre, padre) {
    return poolPostgres.query(queryDeleteChildren,
        [nombre, padre]
    );
}

exports.getChildren = function (padre) {
    return poolPostgres.query(queryGetChildren,
        [padre]
    );
}

exports.editChildren = function (nombre, nacimiento, grupoSanguineo, nombre_old, nacimiento_old, padre) {
    return poolPostgres.query(queryEditChildren,
        [nombre, nacimiento, grupoSanguineo, nombre_old, nacimiento_old, padre]
    );
}

