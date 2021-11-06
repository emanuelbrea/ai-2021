const Children = require("../model/Children");


exports.createChildren = async (req, res, next) => {
    const {nombre, nacimiento, grupoSanguineo, padre} = req.body;

    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    if (!padre || !nombre) {
        message = 'Valores faltantes';
    } else {
        try {
            const children = new Children({nombre, nacimiento, grupoSanguineo, padre});
            const result = await children.createChildren();
            status_code = 200;
            success = 'true';
            message = 'Hijo creado correctamente';
            data = {result: result[0]}
        } catch (error) {
            switch (error?.code) {
                case '23505':
                    message = 'El hijo con ese nombre ya existe. Por favor, utilize otro.';
                    status_code = 403;
                    break;
                default:
                    status_code = 500;
                    message = 'No se pudo crear al hijo'
            }
        }
    }

    const response = {
        success: success,
        message: message,
        data: data
    };
    return res.status(status_code).send(response);

};

exports.deleteChildren = async (req, res, next) => {
    const {nombre, padre} = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!padre || !nombre) {
            message = 'Valores faltantes';
        } else {
            const result = await Children.deleteChildren(nombre, padre);
            success = 'true';
            status_code = 200;
            message = 'Hijo eliminado correctamente';
            data = {};
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

exports.getChildren = async (req, res, next) => {
    const padre = req.query.padre;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!padre) {
            message = 'Valores faltantes';
        } else {
            const result = await Children.getChildren(padre);
            status_code = 200;
            success = 'true';
            message = 'Hijos obtenidos';
            data = {result: result, size: result.length};
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

exports.editChildren = async (req, res, next) => {
    const {nombre, nacimiento, grupoSanguineo, nombre_old, padre} = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!padre || !nombre || !padre) {
            message = 'Valores faltantes';
        } else {
            const result = await Children.editChildren(
                nombre, nacimiento, grupoSanguineo, nombre_old, padre);
            if (!result[0]) {
                message = 'No se pudo actualizar el hijo';
                status_code = 401;
            } else {
                status_code = 200;
                success = 'true';
                message = 'Hijo actualizado correctamente';
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