const poolPostgres = require('../dao/dbpool');

const queryCreateUser = `INSERT INTO users(username, email, password, dni, telefono) VALUES ($1, $2, $3, $4, $5)`

exports.createUser = function (username, email, password, dni, telefono) {
    return poolPostgres.query( queryCreateUser ,
        [username, email, password, dni, telefono]
    );
}


