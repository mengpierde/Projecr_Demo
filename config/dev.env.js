'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
const devDefault = require('./utils/serverProxy');

module.exports = merge(
    prodEnv,
    {
        NODE_ENV: 'development',
        VUE_APP_DEV_TEST: '测试环境-变量',
    },
    devDefault(),
);
