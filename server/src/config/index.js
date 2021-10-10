const MongoDB_URL = `${process.env.MONGODB_domen}${process.env.MONGODB_user}${process.env.MONGODB_options}`

const DataBaseOptions = {
    useUnifiedTopology: true,
}

const errorHandler = function(errorMessage, error) {
    console.error(`
        ===================ERROR=========================\n
        ${errorMessage}\n
        Reason: ${error}\n
        =================================================
    `);
}

module.exports = {
    MongoDB_URL,
    DataBaseOptions,
    errorHandler
}