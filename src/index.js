const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const http = require('http')

const {PORT, dataBaseUrl, dataBaseOptions} = require('./config')

//Налаштування БД
mongoose.connect(dataBaseUrl, dataBaseOptions)

//Ініціалізація додатку
const app = express()

app.use(bodyParser.json())

//Запуск та прослуховування
http.createServer({}, app).listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`)
})
