const { model, Schema } = require('mongoose')
const typeStrReqTrue = { type: String, required: true }

const schema = new Schema({
  imageLink: typeStrReqTrue,
  name: typeStrReqTrue,
  abbreviation: typeStrReqTrue,
  abbreviation_ua: typeStrReqTrue
})

module.exports = model('Specialty', schema)