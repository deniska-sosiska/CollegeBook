import { model, Schema } from 'mongoose';

const typeStrReqTrue = { type: String, required: true };
const schema = new Schema({
    schedule: {}, // Розклад занять групи
    headman: typeStrReqTrue, // Староста
    leader: typeStrReqTrue, // Керiвник групи
    name: typeStrReqTrue, // Назва групи (РПЗ 17 2/9)
    // ↓ Поле для зв'язку групи зі спеціальністю ↓
    specialtyID: typeStrReqTrue,
    // ↓ Поле для структури посилання ↓
    abbreviation: typeStrReqTrue,

    studentsList: [],
});

export const GroupSchema = model('Group', schema);
