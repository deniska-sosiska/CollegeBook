const MongoDB_URL = `${process.env.MONGODB_domen}${process.env.MONGODB_user}${process.env.MONGODB_options}`

const DataBaseOptions = {
  useCreateIndex: JSON.parse(process.env.UseCreateIndex),
  useNewUrlParser: JSON.parse(process.env.UseNewUrlParser),
  useUnifiedTopology: JSON.parse(process.env.UseUnifiedTopology)
}

const errorHandler = function(errorMessage, error) {
  return `
  ===================ERROR=====================\n
   ${errorMessage}\n
   Reason: ${error}\n
  =============================================`
}

module.exports = {
  MongoDB_URL,
  DataBaseOptions,
  errorHandler
}