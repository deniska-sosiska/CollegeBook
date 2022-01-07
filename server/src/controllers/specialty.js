const genericCrud = require('./generic.controller');
const { Specialty } = require('../models');

module.exports = {
    ...genericCrud(Specialty),
};
