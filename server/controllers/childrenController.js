const Children = require("../model/Children");


exports.createChildren = async (req, res, next) => {
    const {nombre, nacimiento, grupoSanguineo, alergias, enfermedades, padre} = req.body;
    try {
        if (!padre || !nombre) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const children = new Children({nombre, nacimiento, grupoSanguineo, alergias, enfermedades, padre});
        const result = await children.createChildren();
        return res.status(201).send('Children created');
    } catch (error) {
        const errorToThrow = new Error();
        switch (error?.code) {
            case '23505':
                errorToThrow.message = 'Children already exists';
                errorToThrow.statusCode = 403;
                break;
            default:
                errorToThrow.statusCode = 500;
        }
        //pass error to next()
        next(errorToThrow);
    }
};

exports.deleteChildren = async (req, res, next) => {
    const {nombre, padre} = req.body;
    try {
        if (!padre || !nombre) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        const result = await Children.deleteChildren(nombre, padre);
        return res.status(200).send('Deleted');
    } catch (error) {
        next(error);
    }
};