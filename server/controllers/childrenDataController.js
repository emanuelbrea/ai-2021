const ChildrenData = require("../model/ChildrenData");


exports.createChildrenData = async (req, res, next) => {
    const {descripcion, tipo, nombre_hijo, padre} = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    if (!descripcion || !tipo || !nombre_hijo) {
        message = 'Valores faltantes';
    } else {
        try {
            const childrenData = new ChildrenData({descripcion, tipo, nombre_hijo, padre});
            const result = await childrenData.createChildrenData();
            status_code = 200;
            success = 'true';
            message = 'Registro creado correctamente';
            data = {result: result[0]}
        } catch (error) {
            switch (error?.code) {
                case '23505':
                    message = 'El registro para ese hijo ya existe. Por favor, utilize otro.';
                    status_code = 403;
                    break;
                default:
                    status_code = 500;
                    message = 'No se pudo crear el registro'
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

exports.deleteChildrenData = async (req, res, next) => {
    const {descripcion, tipo, nombre_hijo, padre} = req.body;

    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!tipo || !nombre_hijo || !padre) {
            message = 'Valores faltantes';
        } else {
            const result = await ChildrenData.deleteChildrenData(descripcion, tipo, nombre_hijo, padre);
            success = 'true';
            status_code = 200;
            message = 'Registro eliminado correctamente';
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

exports.getChildrenData = async (req, res, next) => {
    const nombre_hijo = req.query.nombre_hijo;
    const padre = req.query.padre;

    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!padre) {
            message = 'Valores faltantes';
        } else {
            const result = await ChildrenData.getChildrenData(nombre_hijo, padre);
            status_code = 200;
            success = 'true';
            message = 'Registros obtenidos';
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

exports.editChildrenData = async (req, res, next) => {
    const {descripcion, descripcion_old, tipo, nombre_hijo, padre} = req.body;

    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!descripcion || !tipo || !nombre_hijo || !padre) {
            message = 'Valores faltantes';
        } else {
            const result = await ChildrenData.editChildrenData(descripcion, descripcion_old, tipo, nombre_hijo, padre);
            if (!result[0]) {
                message = 'No se pudo actualizar el registro';
                status_code = 401;
            } else {
                status_code = 200;
                success = 'true';
                message = 'Registro actualizado correctamente';
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