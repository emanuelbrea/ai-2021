const ChildrenData = require("../model/ChildrenData");


exports.createChildrenData = async (req, res, next) => {
    const {descripcion, tipo, nombre_hijo, padre} = req.body;
    try {
        if (!descripcion || !tipo || !nombre_hijo) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const childrenData = new ChildrenData({descripcion, tipo, nombre_hijo, padre});
        const result = await childrenData.createChildrenData();
        return res.status(201).send('ChildrenData created');
    } catch (error) {
        const errorToThrow = new Error();
        switch (error?.code) {
            case '23505':
                errorToThrow.message = 'ChildrenData already exists';
                errorToThrow.statusCode = 403;
                break;
            default:
                errorToThrow.statusCode = 500;
        }
        //pass error to next()
        next(errorToThrow);
    }
};

exports.deleteChildrenData = async (req, res, next) => {
    const {descripcion, tipo, nombre_hijo, padre} = req.body;
    try {
        if (!descripcion || !tipo || !nombre_hijo || !padre) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const result = await ChildrenData.deleteChildrenData(descripcion, tipo, nombre_hijo, padre);
        return res.status(200).send('Deleted childrenData');
    } catch (error) {
        next(error);
    }
};

exports.getChildrenData = async (req, res, next) => {
    const {nombre_hijo, padre} = req.body;
    try {
        if (!nombre_hijo || !padre) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const result = await ChildrenData.getChildrenData(nombre_hijo, padre);
        return res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

exports.editChildrenData = async (req, res, next) => {
    const {descripcion, descripcion_old, tipo, nombre_hijo, padre} = req.body;
    try {
        if (!descripcion || !tipo || !nombre_hijo || !padre) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const result = await ChildrenData.editChildrenData(descripcion, descripcion_old, tipo, nombre_hijo, padre);
        return res.status(200).send('Edited childrenData');
    } catch (error) {
        next(error);
    }
};