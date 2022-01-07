const mongoDBURL = `${process.env.MONGODB_domen}${process.env.MONGODB_user}${process.env.MONGODB_options}`;
const serverPort = process.env.Server_PORT;

const DataBaseOptions = {
    useUnifiedTopology: true,
};

const errorHandler = (error) => {
    // eslint-disable-next-line no-console
    console.error(`
        ========================ERROR==============================\n
        MongoDB connection unsuccessful\n
        Reason: ${error}\n
        ===========================================================
    `);
};

module.exports = {
    mongoDBURL,
    serverPort,
    DataBaseOptions,
    errorHandler,
};
