const genericCrud = require('./generic.controller')
const {  Group  }  = require('../models')

module.exports = {
  ...genericCrud(Group)
}