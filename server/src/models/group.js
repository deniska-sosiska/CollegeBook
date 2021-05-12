const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const typeStrReqTrue = { type: String, required: true }

const schema = new Schema({
  schedule: [],
  headman: { type: String }, //староста
  leader: typeStrReqTrue, //керiвник групи
  nameGroup: typeStrReqTrue,
  specialtyID: typeStrReqTrue,
  abbreviation: typeStrReqTrue,
  abbreviation_ua: typeStrReqTrue
})

module.exports = model('Group', schema) 

// schedule: [
//   {
//     1: typeStrReqTrue,
//     2: typeStrReqTrue,
//     3: typeStrReqTrue,
//     4: typeStrReqTrue,
//     id: typeStrReqTrue,
//   }
// ],