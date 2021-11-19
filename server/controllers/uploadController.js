const uploadDao = require("../dao/uploadDao");

exports.saveImagen = async (req, res, next) => {
    const imagen = req.file.filename;
    const {nombre_hijo, padre} = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!nombre_hijo || !padre) {
            message = 'Valores faltantes';
        } else {
            await uploadDao.deleteImage(nombre_hijo, padre);
            const {rows} = await uploadDao.saveImage(imagen, nombre_hijo, padre)
            if (!rows[0]) {
                message = 'No se pudo crear la imagen';
                status_code = 401;
            } else {
                status_code = 200;
                success = 'true';
                message = 'Imagen cargada correctamente';
                data = {result: imagen};
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

exports.getImagen = async (req, res, next) => {
    const padre = req.query.padre;
    const nombre_hijo = req.query.nombre_hijo;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!nombre_hijo || !padre) {
            message = 'Valores faltantes';
        } else {
            const {rows} = await uploadDao.getImage(nombre_hijo, padre);
            if (rows[0]) {
                message = 'Imagen obtenida correctamente';
                status_code = 200;
                data = {result: rows[0].path};
                success = "true";
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

exports.deleteImagen = async (req, res, next) => {
    const {nombre_hijo, padre} = req.body;
    let success = 'false';
    let message = '';
    let data = {};
    let status_code = 400;
    try {
        if (!nombre_hijo || !padre) {
            message = 'Valores faltantes';
        } else {
            await uploadDao.deleteImage(nombre_hijo, padre);
            status_code = 200;
            message = "Imagen eliminada correctamente"
            success = "true";
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