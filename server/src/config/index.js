export const serverPort = process.env.SERVER_PORT;

const mongoDBDomen = process.env.MONGODB_DOMEN;
const mongoDBUser = process.env.MONGODB_USER;
const mongoDBOptions = process.env.MONGODB_OPTIONS;

export const mongoUrlConnect = `${mongoDBDomen}${mongoDBUser}${mongoDBOptions}`;

export const DataBaseOptions = {
    useUnifiedTopology: true,
};

export const errorHandler = (error) => {
    // eslint-disable-next-line no-console
    console.error(`
        ========================ERROR==============================\n
        MongoDB connection unsuccessful\n
        Reason: ${error}\n
        ===========================================================
    `);
};
