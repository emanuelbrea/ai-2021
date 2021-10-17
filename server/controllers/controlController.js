const Control = require("../model/Control");


exports.createControl = async (req, res, next) => {
    const {
        fecha, peso, altura, diametro, observaciones,
        medicamentos, estudios, resultados, nombre_hijo, padre
    } = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!nombre_hijo || !padre) {
            message = 'Valores faltantes';
        } else {
            try {
                const control = new Control({
                    fecha, peso, altura, diametro, observaciones, medicamentos, estudios, resultados, nombre_hijo, padre
                });
                const result = await control.createControl();
                if (!result[0]) {
                    message = 'No se pudo crear el control';
                    status_code = 401;
                } else {
                    status_code = 200;
                    success = 'true';
                    message = 'Control creado correctamente';
                    data = {"result": result[0]};
                }
            } catch (error) {
                switch (error?.code) {
                    case '23505':
                        message = 'Vacuna ya existente'
                        status_code = 403;
                        break;
                    default:
                        status_code = 500;
                        message = 'No se pudo crear el registro'
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

exports.deleteControl = async (req, res, next) => {
    const {fecha, medicamentos, estudios, resultados, nombre_hijo, padre} = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {

        if (!nombre_hijo || !padre) {
            message = 'Valores faltantes';
        } else {
            const result = await Control.deleteControl(fecha, medicamentos, estudios, resultados, nombre_hijo, padre);
            success = 'true';
            status_code = 200;
            message = 'Control eliminado correctamente';
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

exports.getControls = async (req, res, next) => {
    const padre = req.query.padre;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {

        if (!padre) {
            message = 'Valores faltantes';
        } else {
            const result = await Control.getControls(padre);
            status_code = 200;
            success = 'true';
            message = 'Controles obtenidos';
            data = {"result": result, "size": result.size};
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

exports.editControls = async (req, res, next) => {
    const {
        fecha, peso, altura, diametro, observaciones, medicamentos, estudios, resultados, nombre_hijo,
        fecha_old, medicamentos_old, estudios_old, resultados_old, nombre_hijo_old, padre
    } = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {

        if (!nombre_hijo || !nombre_hijo_old || !padre) {
            message = 'Valores faltantes';
        } else {
            const result = await Control.editControls(
                fecha, peso, altura, diametro, observaciones, medicamentos, estudios, resultados, nombre_hijo,
                fecha_old, medicamentos_old, estudios_old, resultados_old, nombre_hijo_old, padre);
            if (!result[0]) {
                message = 'No se pudo actualizar el control';
                status_code = 401;
            } else {
                status_code = 200;
                success = 'true';
                message = 'Control actualizado correctamente';
                data = {"result": result[0]};
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