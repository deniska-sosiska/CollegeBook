const { model, Schema } = require('mongoose')
const typeStrReqTrue = { type: String, required: true }

const schema = new Schema({
  login: typeStrReqTrue,
  password: typeStrReqTrue,
  name: typeStrReqTrue,
  email: typeStrReqTrue,
  role: typeStrReqTrue,
  specialtyID: { type: String },
  groupID: { type: String }
})

module.exports = model('User', schema)