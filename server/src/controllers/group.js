import { genericCrud } from './generic.controller';
import { SpecialtySchema, StudentSchema, GroupSchema } from '../models';

export const GroupController = {
    ...genericCrud(GroupSchema),

    async get({ params: { abbreviation } }, res) {
        try {
            const answer = await GroupSchema.findOne({ abbreviation }).lean();
            if (answer === null) throw new Error('Group by groupID not found');
            return res.status(200).send(answer);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    async create({ body }, res) {
        if (body.studentsList.length === 0) {
            await new GroupSchema(body).save();
            return res.status(200).send('Group create succes');
        }

        const newGroupForCreate = body;
        const createdStudents = await Promise.all(
            body.studentsList.map((student) => (
                new StudentSchema({
                    name: student,
                    groupID: body.abbreviation,
                }).save()
            )),
        );
        newGroupForCreate.studentsList = createdStudents;

        await new GroupSchema(newGroupForCreate).save();
        return res.status(200).send('Group create success');
    },

    async update({ body }, res) {
        const oldDataGroup = await GroupSchema.findById(body._id).lean();
        const oldStudentsMap = new Map(
            oldDataGroup.studentsList.map((student) => [student.id, student]),
        );

        const studForDelete = body.studentsList.filter((student) => (
            student.id && oldStudentsMap.has(student.id)
        ));
        await Promise.all(studForDelete.map((stud) => (
            StudentSchema.findByIdAndDelete(stud.id)
        )));

        if (body.studentsList.length === 0) {
            await GroupSchema.findByIdAndUpdate(body._id, body, { new: true });
            return res.status(200).send('Group update succes');
        }

        const newGroupForCreate = body;
        const studentsForCreate = [];
        const studentsForUpdate = [];

        for (let i = 0; i < body.studentsList.length; i++) {
            const student = body.studentsList[i];

            if (student.id) {
                const isStudentAlreadyExist = oldStudentsMap.get(student.id);
                if (!!isStudentAlreadyExist && isStudentAlreadyExist.name !== student.name) {
                    studentsForUpdate.push(
                        StudentSchema.findByIdAndUpdate(student.id, { name: student.name }),
                    );
                }
            } else {
                studentsForCreate.push(
                    new StudentSchema({
                        name: student.name,
                        groupID: body.abbreviation,
                    }).save(),
                );
            }
        }

        // Broken logic -TODO
        await Promise.all(studentsForUpdate);
        const newStudents = await Promise.all(studentsForCreate);
        newGroupForCreate.studentsList = newStudents.map((student) => ({
            name: student.name,
            id: student._id,
        }));
        await GroupSchema.findByIdAndUpdate(
            newGroupForCreate._id,
            newGroupForCreate,
            { new: true },
        );
        return res.status(200).send('Group update succes');
    },

    async delete({ params: { id } }, res) {
        const group = await GroupSchema.findById(id);

        for (const elem of group.studentsList) {
            StudentSchema.findByIdAndDelete(elem.id);
        }

        await GroupSchema.findByIdAndDelete(id);
        return res.status(200).send('Group delete succes');
    },

    async getGroupsBySpecialtyID({ params: { specialtyID } }, res) {
        try {
            const items = await GroupSchema.find({ specialtyID });
            const name = await SpecialtySchema.findOne({ abbreviation: specialtyID });
            const nameSpecialty = name.name;

            if (items.length === 0) throw new Error('Groups for this specialty not found');
            return res.status(200).send({
                groups: items,
                nameSpecialty,
            });
        } catch (err) {
            return res.status(400).send(err);
        }
    },
};
