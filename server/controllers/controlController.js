const Control = require("../model/Control");


exports.createControl = async (req, res, next) => {
    const {
        fecha, peso, altura, diametro, observaciones,
        medicamentos, estudios, resultados, nombre_hijo, padre
    } = req.body;
    try {
        if (!nombre_hijo || !padre) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const control = new Control({
            fecha, peso, altura, diametro, observaciones, medicamentos, estudios, resultados, nombre_hijo, padre
        });
        const result = await control.createControl();
        return res.status(201).send('Control created');
    } catch (error) {
        next(error);
    }
};

exports.deleteControl = async (req, res, next) => {
    const {fecha, medicamentos, estudios, resultados, nombre_hijo, padre} = req.body;
    try {
        if (!nombre_hijo || !padre) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const result = await Control.deleteControl(fecha, medicamentos, estudios, resultados, nombre_hijo, padre);
        return res.status(200).send('Deleted');
    } catch (error) {
        next(error);
    }
};