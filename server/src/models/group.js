const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const typeStrReqTrue = { type: String, required: true }

const schema = new Schema({
  schedule: [
    {
      1: typeStrReqTrue,
      2: typeStrReqTrue,
      3: typeStrReqTrue,
      4: typeStrReqTrue,
      id: typeStrReqTrue,
    }
  ],
  headman: typeStrReqTrue,
  leader: typeStrReqTrue,
  nameGroup: typeStrReqTrue,
  idSpecialty: {
    type: ObjectId,
    ref: 'Specialty',
    required: true
  },
  id: typeStrReqTrue
})

module.exports = model('Group', schema)