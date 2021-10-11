var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
require('dotenv').config();

var usersRouter = require('./routes/users');
var childrenRouter = require('./routes/children');
var controlRouter = require('./routes/control');

var server = express();

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieParser());
server.use(cors());
server.use(usersRouter);
server.use(childrenRouter);
server.use(controlRouter);


// catch 404 and forward to error handler
server.use(function (req, res, next) {
    next(createError(404));
});

// error handler
server.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

module.exports = server;
