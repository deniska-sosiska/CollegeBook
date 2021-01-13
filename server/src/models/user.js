const { model, Schema } = require('mongoose')
const typeStrReqTrue = { type: String, required: true }

const schema = new Schema({
  login: typeStrReqTrue,
  password: typeStrReqTrue,
  name: typeStrReqTrue,
  email: typeStrReqTrue,
  role: {
    name: typeStrReqTrue,
    specialty: typeStrReqTrue,
    groupName: typeStrReqTrue
  }
})

module.exports = model('User', schema)