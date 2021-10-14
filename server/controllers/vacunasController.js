const Vacuna = require("../model/Vacuna");


exports.createVacuna = async (req, res, next) => {
    const {fecha, vacuna, lugar, nombre_hijo, padre} = req.body;
    try {
        if (!vacuna || !nombre_hijo) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const vacuna_obj = new Vacuna({fecha, vacuna, lugar, nombre_hijo, padre});
        const result = await vacuna_obj.createVacuna();
        return res.status(201).send('Vacuna created');
    } catch (error) {
        const errorToThrow = new Error();
        switch (error?.code) {
            case '23505':
                errorToThrow.message = 'Vacuna already exists';
                errorToThrow.statusCode = 403;
                break;
            default:
                errorToThrow.statusCode = 500;
        }
        //pass error to next()
        next(errorToThrow);
    }
};

exports.deleteVacuna = async (req, res, next) => {
    const {fecha, vacuna, nombre_hijo, padre} = req.body;
    try {
        if (!vacuna || !nombre_hijo || !padre) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const result = await Vacuna.deleteVacuna(fecha, vacuna, nombre_hijo, padre);
        return res.status(200).send('Deleted vacuna');
    } catch (error) {
        next(error);
    }
};

exports.getVacunas = async (req, res, next) => {
    const padre = req.query.padre;
    try {
        if (!padre) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const result = await Vacuna.getVacunas(padre);
        return res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

exports.editVacuna = async (req, res, next) => {
    const {fecha, vacuna, lugar, nombre_hijo, fecha_old, vacuna_old, nombre_hijo_old, padre} = req.body;
    try {
        if (!nombre_hijo || !nombre_hijo_old || !padre) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const result = await Vacuna.editVacuna(
            fecha, vacuna, lugar, nombre_hijo, fecha_old, vacuna_old, nombre_hijo_old, padre);
        return res.status(200).send('Edited vacuna');
    } catch (error) {
        next(error);
    }
};