const poolPostgres = require('../dao/dbpool');

const queryCreateChildren = `INSERT INTO children(nombre, nacimiento, grupo_sanguineo, padre) 
VALUES ($1, $2, $3, $4) RETURNING *`


const queryDeleteChildren = `DELETE FROM children WHERE nombre= $1 and padre =$2`


exports.createChildren = function (nombre, nacimiento, grupoSanguineo, padre) {
    return poolPostgres.query(queryCreateChildren,
        [nombre, nacimiento, grupoSanguineo,  padre]
    );
}

exports.deleteChildren = function (nombre, padre) {
    return poolPostgres.query(queryDeleteChildren,
        [nombre, padre]
    );
}

