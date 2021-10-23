const poolPostgres = require('../dao/dbpool');

const queryCreateControl = `INSERT INTO control_pediatrico(fecha, peso, altura, diametro, observaciones, medicamentos,
                                                           dosis, periodo, estudios, resultados, nombre_hijo, padre)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`

const queryDeleteControl = `DELETE
                            FROM control_pediatrico
                            WHERE fecha = $1
                              and medicamentos = $2
                              and estudios = $3
                              and resultados = $4
                              and nombre_hijo = $5
                              and padre = $6 RETURNING *`

const queryGetControls = `SELECT *
                          FROM control_pediatrico
                          WHERE padre = $1
                          ORDER BY fecha`

const queryEditControl = `UPDATE control_pediatrico
                          SET fecha         = $1,
                              peso          = $2,
                              altura        = $3,
                              diametro      = $4,
                              observaciones = $5,
                              medicamentos  = $6,
                              dosis         = $7,
                              periodo       = $8,
                              estudios      = $9,
                              resultados    = $10,
                              nombre_hijo   = $11
                          WHERE fecha = $12
                            and medicamentos = $13
                            and estudios = $14
                            and resultados = $15
                            and nombre_hijo = $16
                            and padre = $17 RETURNING *`


exports.createControl = function (fecha, peso, altura, diametro, observaciones, medicamentos, dosis, periodo,
                                  estudios, resultados, nombre_hijo, padre) {
    return poolPostgres.query(queryCreateControl,
        [fecha, peso, altura, diametro, observaciones, medicamentos, dosis, periodo, estudios, resultados,
            nombre_hijo, padre]
    );
}

exports.deleteControl = function (fecha, medicamentos, estudios, resultados, nombre_hijo, padre) {
    return poolPostgres.query(queryDeleteControl,
        [fecha, medicamentos, estudios, resultados, nombre_hijo, padre]
    );
}

exports.getControls = function (padre) {
    return poolPostgres.query(queryGetControls,
        [padre]
    );
}

exports.editControl = function (fecha, peso, altura, diametro, observaciones, medicamentos, dosis, periodo,
                                estudios, resultados, nombre_hijo, fecha_old, medicamentos_old, estudios_old,
                                resultados_old, nombre_hijo_old, padre) {
    return poolPostgres.query(queryEditControl,
        [fecha, peso, altura, diametro, observaciones, medicamentos, dosis, periodo, estudios, resultados,
            nombre_hijo, fecha_old, medicamentos_old, estudios_old, resultados_old, nombre_hijo_old, padre]
    );
}

