const poolPostgres = require('../dao/dbpool');

const queryCreateControl = `INSERT INTO control_pediatrico(id_control_padre, fecha, peso, altura, diametro, observaciones, medicamentos,
estudios, resultados, id_hijo) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`


const queryDeleteControl = `DELETE FROM control_pediatrico WHERE id_control_padre= $1 and id_hijo = $2`


exports.createControl = function (id_control_padre, fecha, peso, altura, diametro, observaciones, medicamentos,
                                  estudios, resultados, id_hijo) {
    return poolPostgres.query(queryCreateControl,
        [id_control_padre, fecha, peso, altura, diametro, observaciones, medicamentos,
            estudios, resultados, id_hijo]
    );
}

exports.deleteControl = function (id_control, id_hijo) {
    return poolPostgres.query(queryDeleteControl,
        [id_control, id_hijo]
    );
}

