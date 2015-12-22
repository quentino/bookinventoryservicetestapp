var _ = require('lodash');
var heroin = require('heroin-js');
var prod = {
    name: 'bookinventoryservice-test',
    domains: [ 'bookinventoryservice-test.herokuapp.com' ]
};
var config = _.merge({}, require('./base'), prod);

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});
configurator(config);
