const genericCrud = require('./generic.controller')
const {  Specialty, Group  }  = require('../models')
const { create } = require('./specialty')

module.exports = {
  ...genericCrud(Group),
  async get({ params: { abbreviation }}, res) {
    try {
      const answer = await Group.findOne({ abbreviation }).lean()
      if (answer === null) throw { message: "Group by groupID not found" }
      return res.status(200).send(answer)
    } catch (err) {
      return res.status(400).send(err)
    }
  },
  
  async getGroupsBySpecialtyID({ params: { specialtyID } }, res) {
    try {
      const items = await Group.find({ specialtyID })
      const name = await Specialty.findOne({ abbreviation: specialtyID })
      const nameSpecialty = name.name

      if (items.length === 0) throw { message: "Groups for this specialty not found" }
      return res.status(200).send({
        groups: items,
        nameSpecialty
      })
    } catch(err) {
      return res.status(400).send(err)
    }
  }
}