const Vacuna = require("../model/Vacuna");


exports.createVacuna = async (req, res, next) => {
    const {fecha, vacuna, lugar, nombre_hijo, padre} = req.body;

    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    if (!vacuna || !nombre_hijo) {
        message = 'Valores faltantes';
    } else {
        try {
            const vacuna_obj = new Vacuna({fecha, vacuna, lugar, nombre_hijo, padre});
            const result = await vacuna_obj.createVacuna();
            if (!result[0]) {
                message = 'No se pudo crear el registro';
                status_code = 401;
            } else {
                status_code = 200;
                success = 'true';
                message = 'Vacuna creada correctamente';
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

    const response = {
        success: success,
        message: message,
        data: data
    };
    return res.status(status_code).send(response);

};

exports.deleteVacuna = async (req, res, next) => {
    const {fecha, vacuna, nombre_hijo, padre} = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!vacuna || !nombre_hijo || !padre) {
            message = 'Valores faltantes';
        } else {
            const result = await Vacuna.deleteVacuna(fecha, vacuna, nombre_hijo, padre);
            success = 'true';
            status_code = 200;
            message = 'Vacuna eliminada correctamente';
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

exports.getVacunas = async (req, res, next) => {
    const padre = req.query.padre;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!padre) {
            message = 'Valores faltantes';
        } else {
            const result = await Vacuna.getVacunas(padre);
            status_code = 200;
            success = 'true';
            message = 'Vacunas obtenidas';
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

exports.editVacuna = async (req, res, next) => {
    const {fecha, vacuna, lugar, nombre_hijo, fecha_old, vacuna_old, nombre_hijo_old, padre} = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!nombre_hijo || !nombre_hijo_old || !padre) {
            message = 'Valores faltantes';
        } else {
            const result = await Vacuna.editVacuna(
                fecha, vacuna, lugar, nombre_hijo, fecha_old, vacuna_old, nombre_hijo_old, padre);
            if (!result[0]) {
                message = 'No se pudo actualizar el registro';
                status_code = 401;
            } else {
                status_code = 200;
                success = 'true';
                message = 'Vacuna actualizada correctamente';
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