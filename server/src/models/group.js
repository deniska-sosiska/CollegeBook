const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const typeStrReqTrue = { type: String, required: true }

const schema = new Schema({
  schedule: [],
  headman: typeStrReqTrue, //староста
  leader: typeStrReqTrue, //керiвник групи
  name: typeStrReqTrue,
  specialtyID: typeStrReqTrue,
  abbreviation: typeStrReqTrue
})

module.exports = model('Group', schema)