import { model, Schema } from 'mongoose';

const typeStrReqTrue = { type: String, required: true };
const schema = new Schema({
    name: typeStrReqTrue,
    groupID: typeStrReqTrue,

    attendance: {},
});

export const StudentSchema = model('Student', schema);
