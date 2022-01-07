const genericCrud = require('./generic.controller');
const { Group, User } = require('../models');

module.exports = {
    ...genericCrud(User),

    async create({ body }, res) {
        try {
            if (body.role === 'Студент') {
                const selectedGroup = await Group.findOne({ abbreviation: body.groupID }).lean();

                const studentIsInList = selectedGroup.studentsList.some((elem) => (
                    elem.name === body.name
                ));
                if (!studentIsInList) {
                    throw new Error(`Такого студента немає в списках групи ${selectedGroup.name}`);
                }

                const findUserByName = await User.findOne({
                    name: body.name,
                    groupID: body.groupID,
                }).lean();

                if (findUserByName) {
                    throw new Error('Такий студент вже зареєстрований');
                }
            }

            const findUserByLogin = await User.findOne({ login: body.login }).lean();
            if (findUserByLogin) {
                throw new Error('Цей логін вже зайнятий');
            }

            const item = new User(body);
            const newItem = await item.save();
            return res.status(200).send({
                login: newItem.login,
                password: newItem.password,
            });
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async authentication({ body: { login, password } }, res) {
        try {
            const item = await User.findOne({ login, password }).lean();
            if (!item) {
                throw new Error('User not found');
            }

            delete item.password;
            return res.status(200).send(item);
        } catch (err) {
            return res.status(400).send(err);
        }
    },
};
