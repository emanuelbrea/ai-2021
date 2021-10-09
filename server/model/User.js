const userDao = require('../dao/users')

//User constructor
function User({
                  username,
                  email,
                  password,
                  dni,
                  telefono
              }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.dni = dni;
    this.telefono = telefono;
}

// add a createUser method to the prototype
User.prototype.createUser = async function () {
    try {
        const {rows} = await userDao.createUser(this.username, this.email, this.password, this.dni, this.telefono);
        return rows;
    } catch (error) {
        throw error;
    }
};
module.exports = User;