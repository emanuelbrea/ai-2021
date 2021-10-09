const poolPostgres = require('../dao/dbpool');

const queryCreateChildren = `INSERT INTO children(nombre, nacimiento, grupo_sanguineo, alergias, enfermedades, padre_id) 
VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`


const queryDeleteChildren = `DELETE FROM children WHERE nombre= $1 and padre_id =$2`


exports.createChildren = function (nombre, nacimiento, grupoSanguineo, alergias, enfermedades, padre) {
    return poolPostgres.query(queryCreateChildren,
        [nombre, nacimiento, grupoSanguineo, alergias, enfermedades, padre]
    );
}

exports.deleteChildren = function (nombre, padre) {
    return poolPostgres.query(queryDeleteChildren,
        [nombre, padre]
    );
}

