const poolPostgres = require('../dao/dbpool');


const queryCreateCodigo = `INSERT INTO codigo(email, value)
                         VALUES ($1, $2) RETURNING *`


const queryVerifyCodigo = `SELECT * FROM codigo
                        WHERE email = $1 AND value = $2 `

const queryDeleteCodigo = `DELETE FROM codigo
                        WHERE email = $1 RETURNING *`

exports.createCodigo = function (email, codigo) {
    return poolPostgres.query(queryCreateCodigo,
        [email, codigo]
    );
}

exports.verifyCodigo = function (email, codigo) {
    return poolPostgres.query(queryVerifyCodigo,
        [email, codigo]
    );
}

exports.deleteCodigo = function (email) {
    return poolPostgres.query(queryDeleteCodigo,
        [email]
    );
}