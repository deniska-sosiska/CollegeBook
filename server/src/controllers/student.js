const genericCrud = require('./generic.controller')
const {  Student  }  = require('../models')

module.exports = {
  ...genericCrud(Student),

  async studentsByGroup({ params: { groupID }, res }) {
    const array = await Student.find({ groupID })
    array.sort((a, b) => {
      if (a.name> b.name) return 1
      if (a.name == b.name) return 0
      if (a.name < b.name) return -1
    })
    res.send(array)
  },

  async studentsUpdate({ body }, res) {
    for(let stud of body) {
      await Student.findByIdAndUpdate(stud._id, stud)
    }
    return res.send("ok")    
  }
}