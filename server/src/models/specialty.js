const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const typeStrReqTrue = { type: String, required: true }

const schema = new Schema({
  groups: [
    {
      type: ObjectId,
      ref: 'Group'
    }
  ],
  imageLink: typeStrReqTrue,
  name: typeStrReqTrue,
  abbreviation: typeStrReqTrue,
  abbreviation_ua: typeStrReqTrue
})

module.exports = model('Specialty', schema)