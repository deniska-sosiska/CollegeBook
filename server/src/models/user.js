const { model, Schema } = require('mongoose')
const typeStrReqTrue = { type: String, required: true }

const schema = new Schema({
  // Користувач - це студент або вчитель
  login: typeStrReqTrue, // Логін користувача
  password: typeStrReqTrue, // Пароль користувача
  name: typeStrReqTrue, // Ім'я користувача
  email: typeStrReqTrue, // Пошта користувача
  role: typeStrReqTrue, // Роль користувача
  // ↓↓↓ Група до якої належить студент ↓↓↓
  // (якщо користувач студент)
  groupID: { type: String } 
})

module.exports = model('User', schema)