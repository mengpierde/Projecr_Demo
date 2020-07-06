module.exports = function () {
    let nodeEnv = process.env.NODE_ENV;

    let envConfig;
    if ('production' === nodeEnv) {
        envConfig = require('./prod.env');
    } else if ('development' === nodeEnv) {
        envConfig = require('./dev.env');
    }

    if (envConfig) {
        Object.assign(process.env, envConfig);
    }
};
