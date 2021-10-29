const helper = require('../auth/helper')
const User = require('../model/User');
const Codigo = require('../model/Codigo');

exports.postSignup = async (req, res, next) => {
    //getting user data from request body
    const {password, email, dni, telefono, nombre, apellido} = req.body;

    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {

        if (!email || !password) {
            message = 'Valores faltantes';
        } else if (!helper.isValidEmail(email)) {
            message = 'Por favor, ingrese un mail valido';
        } else {
            const hashPassword = helper.hashPassword(password);
            const user = new User({
                email,
                password: hashPassword,
                nombre,
                apellido,
                dni: Number(dni),
                telefono: Number(telefono)
            });

            try {
                await user.createUser();
                status_code = 200;
                success = 'true';
                message = 'Usuario registrado correctamente';
                data = {};
            } catch (error) {
                switch (error?.code) {
                    case '23505':
                        message = 'Usuario con email ya registrado! Por favor, utilize otro.'
                        status_code = 403;
                        break;
                    default:
                        status_code = 500;
                        message = 'No se pudo crear al usuario'
                }
            }
        }
    } catch (error) {
        message = error.message;
        status_code = 500;
    }
    const response = {
        success: success,
        message: message,
        data: data
    };
    return res.status(status_code).send(response);
};

exports.checkLogin = async (req, res, next) => {
    //getting user data from request body
    const {email, password} = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!email || !password) {
            message = 'Valores faltantes';
        } else if (!helper.isValidEmail(email)) {
            message = 'Por favor, ingrese un mail valido';
        } else {
            const result = await User.userLogin(email);
            if (!result[0] || !helper.comparePassword(result[0].password, password)) {
                message = 'Credenciales incorrectas';
                status_code = 401;
            } else {
                const token = helper.generateToken(result[0].id);
                status_code = 200;
                success = 'true';
                message = 'Inicio de sesion correcto';
                data = {"token": token, "username": email};
            }
        }
    } catch (error) {
        message = error.message;
        status_code = 500;
    }
    const response = {
        success: success,
        message: message,
        data: data
    };
    return res.status(status_code).send(response);
};

exports.updateUser = async (req, res, next) => {
    //getting user data from request body
    const {dni, telefono, email, nombre, apellido} = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!email) {
            message = 'Valores faltantes';
        } else {
            const result = await User.updateUser(nombre, apellido, Number(dni), Number(telefono), email);
            if (!result[0]) {
                message = 'No se pudo actualizar el usuario';
                status_code = 401;
            } else {
                status_code = 200;
                success = 'true';
                message = 'Usuario actualizado correctamente';
                data = {result: result[0]};
            }
        }

    } catch (error) {
        message = error.message;
        status_code = 500;
    }
    const response = {
        success: success,
        message: message,
        data: data
    };
    return res.status(status_code).send(response);
};

exports.getProfile = async (req, res, next) => {
    const email = req.query.email;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!email) {
            message = 'Valores faltantes';
        } else {
            const result = await User.userLogin(email);
            if (!result[0]) {
                message = 'Usuario no existente';
                status_code = 401;
            } else {
                status_code = 200;
                success = 'true';
                message = 'Usuario encontrado';
                data = {
                    "nombre": result[0].nombre,
                    "apellido": result[0].apellido,
                    "dni": result[0].dni,
                    "telefono": result[0].telefono,
                    "email": result[0].email
                };
            }
        }
    } catch (error) {
        message = error.message;
        status_code = 500;
    }
    const response = {
        success: success,
        message: message,
        data: data
    };
    return res.status(status_code).send(response);
};

exports.forgotPassword = async (req, res, next) => {
    const {dni, email} = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!email || !dni) {
            message = 'Valores faltantes';
        } else {
            const user = await User.userLogin(email);
            if (!user[0] || Number(dni) !== user[0].dni) {
                message = 'Usuario no existente';
                status_code = 401;
            } else {
                const codigo = helper.generateCodigo();
                const token = new Codigo({email: email, codigo: codigo});
                const result = await token.createCodigo();
                if (result[0]) {
                    const email = await helper.sendEmail(user[0].nombre, codigo);
                    message = 'Email enviado correctamente';
                    status_code = 200;
                    success = 'true';
                } else {
                    message = 'Hubo un error al enviar el mail.'
                    status_code = 500;
                }
            }
        }

    } catch (error) {
        message = error.message;
        status_code = 500;
    }
    const response = {
        success: success,
        message: message,
        data: data
    };
    return res.status(status_code).send(response);

}

exports.verifyCode = async (req, res, next) => {
    const {email, codigo} = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!email || !codigo || typeof codigo !== 'number') {
            message = 'Valores faltantes';
        } else {
            const valid = await Codigo.verifyCodigo(email, codigo);
            if (!valid[0]) {
                message = 'Codigo no valido';
                status_code = 401;
            } else {
                message = 'Codigo valido';
                status_code = 200;
                success = 'true';
                data = {"codigo": codigo}
            }
        }
    } catch (error) {
        message = error.message;
        status_code = 500;
    }
    const response = {
        success: success,
        message: message,
        data: data
    };
    return res.status(status_code).send(response);

}

exports.resetPassword = async (req, res, next) => {
    const {email, codigo, password} = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!email || !codigo || !password || typeof codigo !== 'number') {
            message = 'Valores faltantes';
        } else {
            const valid = await Codigo.verifyCodigo(email, codigo);
            if (!valid[0]) {
                message = 'Codigo no valido';
                status_code = 401;
            } else {
                const hashPassword = helper.hashPassword(password);
                const result = await User.updatePassword(hashPassword, email);
                if (result[0]) {
                    message = 'Contraseña cambiada correctamente';
                    status_code = 200;
                    success = 'true';
                    data = {}
                    await Codigo.borrarCodigo(email);
                } else {
                    message = 'Hubo un error al actualizar la contraseña';
                }
            }
        }
    } catch (error) {
        message = error.message;
        status_code = 500;
    }
    const response = {
        success: success,
        message: message,
        data: data
    };
    return res.status(status_code).send(response);

}