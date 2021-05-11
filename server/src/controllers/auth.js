const {  User  }  = require('../models')

module.exports = {

  async authentication({ body: { login, password } }, res) {
    try {
      const item = await User.findOne({ login, password })

      if (!item)
        throw { message: "User not found" }

      res.status(200).send(item)
    } catch(err) {
      return res.status(400).send(err)
    }
  }
  
}