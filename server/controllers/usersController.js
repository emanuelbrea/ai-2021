const helper = require('../auth/helper')
const User = require('../model/User');

exports.postSignup = async (req, res, next) => {
    //getting user data from request body
    const {username, password, email, dni, telefono} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        if (!helper.isValidEmail(email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const hashPassword = helper.hashPassword(password);
        const user = new User({username, email, password:hashPassword, dni, telefono});
        const result = await user.createUser();
        const token = helper.generateToken(result[0].id);
        return res.status(201).send({ token });
    } catch (error) {
        const errorToThrow = new Error();
        switch (error?.code) {
            case '23505':
                errorToThrow.message = 'User already exists';
                errorToThrow.statusCode = 403;
                break;
            default:
                errorToThrow.statusCode = 500;
        }
        //pass error to next()
        next(errorToThrow);
    }
};

exports.checkLogin = async (req, res, next) => {
    //getting user data from request body
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        if (!helper.isValidEmail(email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const result = await User.userLogin(email);
        if (!result[0]) {
            return res.status(400).send({'message': 'The credentials you provided are incorrect'});
        }
        if(!helper.comparePassword(result[0].password, password)) {
            return res.status(400).send({ 'message': 'The credentials you provided are incorrect' });
        }
        const token = helper.generateToken(result[0].id);
        return res.status(200).send({ token });
    } catch (error) {
        const errorToThrow = new Error();
        switch (error?.code) {
            case '23505':
                errorToThrow.message = 'User already exists';
                errorToThrow.statusCode = 403;
                break;
            default:
                errorToThrow.statusCode = 500;
        }
        //pass error to next()
        next(errorToThrow);
    }
};

