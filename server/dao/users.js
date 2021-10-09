const poolPostgres = require('../dao/dbpool');

const queryCreateUser = `INSERT INTO users(username, email, password, dni, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING *`

const queryLoginUser = `SELECT * FROM  users where email = $1 `

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


