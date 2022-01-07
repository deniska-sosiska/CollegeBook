const genericCrud = require('./generic.controller');
const { Student } = require('../models');

module.exports = {
    ...genericCrud(Student),

    async studentsByGroup({ params: { groupID }, res }) {
        const array = await Student.find({ groupID });
        array.sort((a, b) => {
            if (a.name > b.name) { return 1; }
            if (a.name < b.name) { return -1; }
            return 0; // a.name === b.name
        });
        return res.status(200).send(array);
    },

    async studentsUpdate({ body }, res) {
        await Promise.all(body.map((stud) => (
            Student.findByIdAndUpdate(stud._id, stud)
        )));

        return res.send('ok');
    },
};
