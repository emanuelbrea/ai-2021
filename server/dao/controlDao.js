const poolPostgres = require('../dao/dbpool');

const queryCreateControl = `INSERT INTO control_pediatrico(fecha, peso, altura, diametro, observaciones, medicamentos,
estudios, resultados, id_hijo) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`


const queryDeleteControl = `DELETE FROM control_pediatrico WHERE fecha= $1 and medicamentos = $2 
and estudios = $3 and resultados = $4 and id_hijo = $5`


exports.createControl = function (fecha, peso, altura, diametro, observaciones, medicamentos,
                                  estudios, resultados, id_hijo) {
    return poolPostgres.query(queryCreateControl,
        [fecha, peso, altura, diametro, observaciones, medicamentos, estudios, resultados, id_hijo]
    );
}

exports.deleteControl = function (fecha, medicamentos, estudios, resultados, id_hijo) {
    return poolPostgres.query(queryDeleteControl,
        [fecha, medicamentos, estudios, resultados, id_hijo]
    );
}

