'use strict';

let mongoose = require('mongoose');

exports.register = function (server, options, next) {

  mongoose.connect('mongodb://' + options.host + '/' + options.db);
  let mongodb = mongoose.connection;
  mongodb.on('error', () => {
    server.log(['error', 'database'], 'mongodb connection error!');
  });

  mongodb.once('open', () => {
    server.log(['info', 'database'], 'nozomy mongodb connected');

    server.expose('mongodb', mongodb);
    next();
  });
};

exports.register.attributes = {
    name: 'db',
    version: '1.0.0'
};