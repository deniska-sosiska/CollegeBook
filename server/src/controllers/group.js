const genericCrud = require('./generic.controller')
const {  Specialty, Student, Group  }  = require('../models')

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

  async create({ body }, res) {
    if (body.studentsList.length == 0) {
      await new Group(body).save()  
      return res.status(200).send("Group create succes")
    }

    for(let i = 0; i < body.studentsList.length; i++) {
      let elem = body.studentsList[i]

      const stud = await new Student({
        name: elem,
        groupID: body.abbreviation
      }).save()

      body.studentsList[i] = { name: stud.name, id: stud._id }
    }

    await new Group(body).save()  
    return res.status(200).send("Group create succes")
  },

  async update({ body }, res) {
    const oldDataGroup = await Group.findById(body._id).lean()
    // console.log("\nOldDataGroup: \n", oldDataGroup.studentsList)
    // console.log("\nBody\n", body.studentsList)
    // console.log("\n")

    const studForDelete = oldDataGroup.studentsList.filter(stud => !body.studentsList.some(elem => (stud.id == elem.id) && elem.id)) 

    for(let elem of studForDelete) {
      await Student.findByIdAndDelete(elem.id)
    }

    if (body.studentsList.length == 0) {
      await Group.findByIdAndUpdate(body._id , body, { new: true })
      return res.status(200).send("Group update succes")
    }

    for(let i = 0; i < body.studentsList.length; i++){
      let elem = body.studentsList[i]

      if (elem.id) {
        const studentForUpdate = oldDataGroup.studentsList.find(stud => stud.id == elem.id && stud.name != elem.name)
        if (studentForUpdate) await Student.findByIdAndUpdate(elem.id, { name: elem.name })

      } else {
        const stud = await new Student({
          name: elem.name,
          groupID: body.abbreviation
        }).save()
        body.studentsList[i] = { name: stud.name, id: stud._id }
      }
    }

    await Group.findByIdAndUpdate(body._id , body, { new: true })
    return res.status(200).send("Group update succes")
  },

  async delete({ params: { id }}, res) {
    const group = await Group.findById(id)

    for(let elem of group.studentsList) {
      Student.findByIdAndDelete(elem.id)
    }
    return res.status(200).send("Group delete succes")
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