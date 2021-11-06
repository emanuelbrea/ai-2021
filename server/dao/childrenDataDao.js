const poolPostgres = require('../dao/dbpool');

const queryCreateChildrenData = `INSERT INTO children_data(descripcion, tipo, nombre_hijo, padre) 
VALUES ($1, $2, $3, $4) RETURNING *`

const queryDeleteChildrenData = `DELETE FROM children_data 
WHERE  ($1 is null or descripcion = $1) and tipo =$2 and nombre_hijo=$3 and padre=$4 RETURNING *`

const queryGetChildrenData = `SELECT * FROM children_data WHERE nombre_hijo=$1 and padre=$2`

const queryEditChildrenData = `UPDATE children_data SET descripcion=$1 
where descripcion= $2 and tipo=$3 and nombre_hijo =$4 and padre=$5 RETURNING *`

exports.createChildrenData = function (descripcion, tipo, nombre_hijo, padre) {
    return poolPostgres.query(queryCreateChildrenData,
        [descripcion, tipo, nombre_hijo, padre]
    );
}

exports.deleteChildrenData = function (descripcion, tipo, nombre_hijo, padre) {
    return poolPostgres.query(queryDeleteChildrenData,
        [descripcion, tipo, nombre_hijo, padre]
    );
}

exports.getChildrenData = function (nombre_hijo, padre) {
    return poolPostgres.query(queryGetChildrenData,
        [nombre_hijo, padre]
    );
}

exports.editChildrenData = function (descripcion, descripcion_old, tipo, nombre_hijo, padre) {
    return poolPostgres.query(queryEditChildrenData,
        [descripcion, descripcion_old, tipo, nombre_hijo, padre]
    );
}