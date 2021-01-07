const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema = new Schema({
  schedule: [
    {
      1: String,
      2: String,
      3: String,
      4: String,
      id: String
    }
  ],
  headman: String,
  leader: String,
  nameGroup: String,
  idSpecialty: {
    type: ObjectId,
    ref: 'Specialty'
  },
  id: String
})

module.exports = model('Group', schema)