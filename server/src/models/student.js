const { model, Schema } = require('mongoose')
const typeStrReqTrue = { type: String, required: true }

const schema = new Schema({
  name: typeStrReqTrue, 
  groupID: typeStrReqTrue,

  attendance: {}
})

module.exports = model('Student', schema) 
