const serverPort = process.env.Server_PORT;
const mongoDBDomen = process.env.MONGODB_DOMEN;
const mongoDBUser = process.env.MONGODB_USER;
const mongoDBOptions = process.env.MONGODB_OPTIONS;

const mongoUrlConnect = `${mongoDBDomen}${mongoDBUser}${mongoDBOptions}`;


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
    mongoUrlConnect,
    serverPort,
    DataBaseOptions,
    errorHandler,
};
