const user = require('./user');
const dataInfo = require('./dataInfo');
const api = {};

Object.assign(
    api,
    user,
    dataInfo
);
module.exports = api;
