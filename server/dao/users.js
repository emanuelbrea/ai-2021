const poolPostgres = require('../dao/dbpool');

const queryCreateUser = `INSERT INTO users(username, email, password, dni, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING *`

const queryLoginUser = `SELECT * FROM  users where email = $1 `

const queryUpdateUser = `UPDATE users set username=$1, password=$2, dni=$3, telefono=$4 where email=$5 RETURNING *`

exports.createUser = function (username, email, password, dni, telefono) {
    return poolPostgres.query(queryCreateUser,
        [username, email, password, dni, telefono]
    );
}

exports.userLogin = function (email) {
    return poolPostgres.query(queryLoginUser,
        [email]
    );
}

exports.updateUser = function (username, password, dni, telefono, email) {
    return poolPostgres.query(queryUpdateUser,
        [username, password, dni, telefono, email]
    );
}


