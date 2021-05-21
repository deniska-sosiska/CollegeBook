const genericCrud = require('./generic.controller')
const {  Student  }  = require('../models')

module.exports = {
  ...genericCrud(Student),

  async studentsByGroup({ params: { groupID }, res }) {
    const array = await Student.find({ groupID })
    res.send(array)
  }
}