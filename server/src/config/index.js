const PORT = 3000
const dataBaseUrl = 'mongodb://localhost:27017/CollegeDB'
const dataBaseOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const errorHandler = function(errorMessage, error) {
  return `
  ===================ERROR=====================\n
   ${errorMessage}\n
   Reason: ${error}\n
  =============================================`
}

module.exports = {
  PORT,
  dataBaseUrl,
  dataBaseOptions,
  errorHandler
}