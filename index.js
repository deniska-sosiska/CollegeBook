const express = require('express')
const app = express()
const port = 8887

// app.use('/public', express.static('./public'));


app.get('/', function(req, res) {
  // res.sendFile('./public/index.html');
})

app.listen(port, (error) => {
  if (error)
    console.error(`Помилка => ${error}`)
  console.log(`Сервер запущений на http://localhost:${port}`)
})