const Vacuna = require("../model/Vacuna");


exports.createVacuna = async (req, res, next) => {
    const {fecha, vacuna, lugar, nombre_hijo, padre} = req.body;
    try {
        let success = 'false';
        let message = '';
        let data = {};
        let status_code = 400;
        if (!vacuna || !nombre_hijo) {
            message = 'Some values are missing';
        }
        else{
            try{
                const vacuna_obj = new Vacuna({fecha, vacuna, lugar, nombre_hijo, padre});
                const result = await vacuna_obj.createVacuna();
                if (!result[0] ) {
                    message = 'No se pudo crear el registro';
                    status_code = 401;
                } else {
                    status_code = 200;
                    success = 'true';
                    message = 'Vacuna creada correctamente';
                    data = {"result": result[0]};
                }
            }catch (error) {
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
    } catch (error) {
        next(error);
    }
};

exports.deleteVacuna = async (req, res, next) => {
    const {fecha, vacuna, nombre_hijo, padre} = req.body;
    try {
        let success = 'false';
        let message = '';
        let data = {};
        let status_code = 400;
        if (!vacuna || !nombre_hijo || !padre) {
            message= 'Some values are missing';
        }
        else{
            const result = await Vacuna.deleteVacuna(fecha, vacuna, nombre_hijo, padre);
            success = 'true';
            status_code = 200;
            message = 'Vacuna eliminada correctamente';
            data = {};
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

exports.getVacunas = async (req, res, next) => {
    const padre = req.query.padre;
    try {
        let success = 'false';
        let message = '';
        let data = {};
        let status_code = 400;
        if (!padre) {
            message= 'Some values are missing';
        }
        else{
            const result = await Vacuna.getVacunas(padre);
            status_code = 200;
            success = 'true';
            message = 'Vacunas obtenidas';
            data = {"result": result, "size": result.size};
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

exports.editVacuna = async (req, res, next) => {
    const {fecha, vacuna, lugar, nombre_hijo, fecha_old, vacuna_old, nombre_hijo_old, padre} = req.body;
    try {
        let success = 'false';
        let message = '';
        let data = {};
        let status_code = 400;
        if (!nombre_hijo || !nombre_hijo_old || !padre) {
            message= 'Some values are missing';
        }
        else{
            const result = await Vacuna.editVacuna(
                fecha, vacuna, lugar, nombre_hijo, fecha_old, vacuna_old, nombre_hijo_old, padre);
            if (!result[0] ) {
                message = 'No se pudo actualizar el registro';
                status_code = 401;
            } else {
                status_code = 200;
                success = 'true';
                message = 'Vacuna actualizado correctamente';
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