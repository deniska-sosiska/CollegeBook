const PORT = 8888
const dataBaseUrl = 'mongodb://localhost:27017/CollegeDB'
const dataBaseOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

module.exports = {
  PORT,
  dataBaseUrl,
  dataBaseOptions
}