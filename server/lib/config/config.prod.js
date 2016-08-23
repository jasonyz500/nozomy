'use strict';

let config = module.exports = {};

config.env = 'prod';

config.mongodb = {};
config.mongodb.host = 'localhost';
config.mongodb.db = 'nozomy';

config.goodOptions = {
    ops: {
        interval: 10000
    },
    reporters: {
        console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', request: '*', response: '*', error: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        file: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', request: '*', response: '*', error: '*', ops: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson',
            args: [
                null,
                { separator: '\n' }
            ]
        }, {
            module: 'rotating-file-stream',
            args: [
                'nozomy-log',
                { size: '100MB', path: '../logs' }
            ]
        }]
    }
}