const poolPostgres = require('../dao/dbpool');

const querySaveImagen = `INSERT INTO imagen(path, nombre_hijo, padre)
                           VALUES ($1, $2, $3) RETURNING *`

const queryDeleteImagen = `DELETE FROM imagen where nombre_hijo=$1 and padre=$2`

const queryGetImagen = `SELECT * from imagen where nombre_hijo=$1 and padre=$2`


exports.saveImage = function (path, nombre_hijo, padre) {
    return poolPostgres.query(querySaveImagen,
        [path, nombre_hijo, padre]
    );
}

exports.deleteImage = function (nombre_hijo, padre) {
    return poolPostgres.query(queryDeleteImagen,
        [nombre_hijo, padre]
    );
}

exports.getImage = function (nombre_hijo, padre) {
    return poolPostgres.query(queryGetImagen,
        [nombre_hijo, padre]
    );
}