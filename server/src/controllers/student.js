import { genericCrud } from './generic.controller';
import { StudentSchema } from '../models';

export const StudentController = {
    ...genericCrud(StudentSchema),

    async studentsByGroup({ params: { groupID }, res }) {
        const array = await StudentSchema.find({ groupID });
        array.sort((a, b) => {
            if (a.name > b.name) { return 1; }
            if (a.name < b.name) { return -1; }
            return 0; // a.name === b.name
        });
        return res.status(200).send(array);
    },

    async studentsUpdate({ body }, res) {
        await Promise.all(body.map((stud) => (
            StudentSchema.findByIdAndUpdate(stud._id, stud)
        )));

        return res.send('ok');
    },
};
