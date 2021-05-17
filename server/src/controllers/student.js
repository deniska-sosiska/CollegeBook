const genericCrud = require('./generic.controller')
const {  Student  }  = require('../models')

module.exports = {
  ...genericCrud(Student)
}