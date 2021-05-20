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
    if (body.studentsList.length !== 0) {
      body.studentsList.forEach(async (elem, i) => {
        const stud = await new Student({
          name: elem,
          groupID: body.abbreviation
        }).save()
        body.studentsList[i] = { name: stud.name, id: stud._id }

        if ((i + 1) === body.studentsList.length) {
          await new Group(body).save()  
          return res.status(200).send("Group create succes")
        }
      })
    } else {
      await new Group(body).save()  
      return res.status(200).send("Group create succes")
    }
  },

  async update({ body }, res) {
    const oldDataGroup = await Group.findById(body._id).lean()
    // console.log("\nOldDataGroup: \n", oldDataGroup.studentsList)
    // console.log("\nBody\n", body.studentsList)
    // console.log("\n")

    const studForDelete = oldDataGroup.studentsList.filter(stud => !body.studentsList.some(elem => (stud.id == elem.id) && elem.id)) 
    studForDelete.forEach(async (elem) => {
      await Student.findByIdAndDelete(elem.id)
    })

    body.studentsList.forEach(async (elem, i) => {

      if (!!elem.id) {
        const studentForUpdate = oldDataGroup.studentsList.find(stud => stud.id == elem.id && stud.name != elem.name)
        if (studentForUpdate) await Student.findByIdAndUpdate(elem.id, { name: elem.name })

      } else {
        const stud = await new Student({
          name: elem.name,
          groupID: body.abbreviation
        }).save()
        body.studentsList[i] = { name: stud.name, id: stud._id }
      }

      if ((i + 1) === body.studentsList.length) {
        setTimeout(async () => {
          await Group.findByIdAndUpdate(body._id , body, { new: true })
        }, 5000);
        return res.status(200).send("Group update succes")
      }
    })

    if (body.studentsList.length == 0) {
      await Group.findByIdAndUpdate(body._id , body, { new: true })
      return res.status(200).send("Group update succes")
    }

  },

  async delete({ params: { id }}, res) {
    const group = await Group.findById(id)
    group.studentsList.forEach(async (elem, i) => {
      await Student.findByIdAndDelete(elem.id)
      if (i + 1 === group.studentsList.length) {
        await Group.findByIdAndDelete(id)
        return res.status(200).send("Group delete succes")
      }
    })
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