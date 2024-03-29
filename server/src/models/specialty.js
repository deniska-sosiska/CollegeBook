import { model, Schema } from 'mongoose';

const typeStrReqTrue = { type: String, required: true };
const schema = new Schema({
    imageLink: typeStrReqTrue, // Посилання на картинку для заставки
    name: typeStrReqTrue, // Назва спеціальності
    abbreviation: typeStrReqTrue,
    // ↑↓↑↓ Поля які потрібні для структури посилання ↑↓↑↓
    abbreviation_ua: typeStrReqTrue,
});

export const SpecialtySchema = model('Specialty', schema);
