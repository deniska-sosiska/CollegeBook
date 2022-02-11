/* eslint-disable no-console */

export const serverPort = String(process.env.SERVER_PORT);

const mongoDBDomen = String(process.env.MONGODB_DOMEN);
const mongoDBUser = String(process.env.MONGODB_USER);
const mongoDBOptions = String(process.env.MONGODB_OPTIONS);

export const mongoUrlConnect = `${mongoDBDomen}${mongoDBUser}${mongoDBOptions}`;
export const DataBaseOptions = {
    useUnifiedTopology: true,
};

export const errorHandler = (error) => {
    console.error(`
        ========================ERROR==============================\n
        MongoDB connection unsuccessful\n
        Reason: ${error}\n
        ===========================================================
    `);
};
