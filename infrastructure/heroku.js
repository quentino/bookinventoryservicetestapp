var heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

configurator.export('bookinventoryservicetestapp').then(function (result) {
    console.log(result);
});

configurator({
        name: 'bookinventoryservicetestapp',
        region: 'eu',
        maintenance: false,
        stack: 'cedar-14',
        config_vars: {},
        addons: {},
        collaborators: ['bartlomiej.pacura@outlook.com',
            'micpawluk@gmail.com',
            'wiktor.maj@schibsted.pl'],
        features: {
            'runtime-dyno-metadata': {enabled: false},
            'log-runtime-metrics': {enabled: false},
            'http-session-affinity': {enabled: false},
            preboot: {enabled: false},
            'http-shard-header': {enabled: false},
            'http-end-to-end-continue': {enabled: false}
        },
        formation: [{process: 'web', quantity: 1, size: 'Free'}],
        log_drains: [],
        domains: ['bookinventoryservicetestapp.herokuapp.com']
    }
);
