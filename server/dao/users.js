const poolPostgres = require('../dao/dbpool');

const queryCreateUser = `INSERT INTO users(email, password, nombre, apellido, dni, telefono)
                         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`

const queryLoginUser = `SELECT *
                        FROM users
                        where email = $1 `

const queryUpdateUser = `UPDATE users
                         set nombre=$1,
                             apellido=$2,
                             dni=$3,
                             telefono=$4
                         where email = $5 RETURNING *`

const queryUpdatePassword = `UPDATE users
                             set password=$1
                             where email = $2 RETURNING *`

const queryDni = `SELECT *
                  FROM users
                  where dni = $1 `

exports.createUser = function (email, password, nombre, apellido, dni, telefono) {
    return poolPostgres.query(queryCreateUser,
        [email, password, nombre, apellido, dni, telefono]
    );
}

exports.userLogin = function (email) {
    return poolPostgres.query(queryLoginUser,
        [email]
    );
}

exports.updateUser = function (nombre, apellido, dni, telefono, email) {
    return poolPostgres.query(queryUpdateUser,
        [nombre, apellido, dni, telefono, email]
    );
}

exports.updatePassword = function (password, email) {
    return poolPostgres.query(queryUpdatePassword,
        [password, email]
    );
}

exports.checkDNI = function (dni) {
    return poolPostgres.query(queryDni,
        [dni]
    );
}
