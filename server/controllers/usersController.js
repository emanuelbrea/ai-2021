const helper = require('../auth/helper')
const User = require('../model/User');

exports.postSignup = async (req, res, next) => {
    //getting user data from request body
    const {username, password, email, dni, telefono} = req.body;
    try {
        let success = 'false';
        let message = '';
        let data = {};
        let status_code = 400;
        if (!email || !password) {
            message = 'Some values are missing';
        } else if (!helper.isValidEmail(email)) {
            message = 'Por favor, ingrese un mail valido';
        } else {
            const hashPassword = helper.hashPassword(password);
            const user = new User({username, email, password: hashPassword, dni, telefono});

            try {
                const result = await user.createUser();
                const token = helper.generateToken(result[0].id);
                status_code = 200;
                success = 'true';
                message = 'Usuario registrado correctamente';
                data = {"token": token};
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

        const response = {
            success: success,
            message: message,
            data: data
        };
        return res.status(status_code).send(response);
    } catch (error) {
        next(error);
    }
};

exports.checkLogin = async (req, res, next) => {
    //getting user data from request body
    const {email, password} = req.body;
    try {
        let success = 'false';
        let message = '';
        let data = {};
        let status_code = 400;
        if (!email || !password) {
            message = 'Some values are missing';
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
                data = {"token": token};
            }
        }
        const response = {
            success: success,
            message: message,
            data: data
        };
        return res.status(status_code).send(response);
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    //getting user data from request body
    const {username, password, dni, telefono, email} = req.body;
    try {
        let success = 'false';
        let message = '';
        let data = {};
        let status_code = 400;
        if (!email) {
            message = 'Some values are missing';
        } else {
            const result = await User.updateUser(username, password, dni, telefono, email);
            if (!result[0] ) {
                message = 'No se pudo actualizar el usuario';
                status_code = 401;
            } else {
                status_code = 200;
                success = 'true';
                message = 'Usuario actualizado correctamente';
                data = {"result": result[0]};
            }
        }
        const response = {
            success: success,
            message: message,
            data: data
        };
        return res.status(status_code).send(response);
    } catch (error) {
        next(error);
    }
};
