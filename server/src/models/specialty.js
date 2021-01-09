const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema = new Schema({
  groups: [
    {
      type: ObjectId,
      ref: 'Group'
    }
  ],
  linkImage: String,
  name: String,
  id: String,
  abbreviation: String,
})

module.exports = model('Specialty', schema)