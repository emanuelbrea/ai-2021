const Control = require("../model/Control");


exports.createControl = async (req, res, next) => {
    const {id, fecha, peso, altura, diametro, observaciones, medicamentos, estudios, resultados, id_hijo} = req.body;
    try {
        if (!id || !id_hijo) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const control = new Control({
            id,
            fecha, peso, altura, diametro, observaciones, medicamentos, estudios, resultados, id_hijo
        });
        const result = await control.createControl();
        return res.status(201).send('Control created');
    } catch (error) {
        next(error);
    }
};

exports.deleteControl = async (req, res, next) => {
    const {id, id_hijo} = req.body;
    try {
        if (!id || !id_hijo) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const result = await Control.deleteControl(id, id_hijo);
        return res.status(200).send('Deleted');
    } catch (error) {
        next(error);
    }
};