const userDao = require('../dao/users')

//User constructor
function User({
                  email,
                  password,
                  nombre, apellido,
                  dni,
                  telefono
              }) {
    this.email = email;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.telefono = telefono;
}

// add a createUser method to the prototype
User.prototype.createUser = async function () {
    try {
        const {rows} = await userDao.createUser(this.email, this.password,
            this.nombre, this.apellido, this.dni, this.telefono);
        return rows;
    } catch (error) {
        throw error;
    }
};


User.userLogin = async function (email) {
    try {
        const {rows} = await userDao.userLogin(email);
        return rows;
    } catch (error) {
        throw error;
    }
};

User.updateUser = async function (nombre, apellido, dni, telefono, email) {
    try {
        const {rows} = await userDao.updateUser(nombre, apellido, dni, telefono, email);
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = User
