import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        validate: { validator: function (v) { return /^0[2-9]\d{7}$|^05[0-9]\d{7}$/.test(v); }, }
    },
    password: {
        type: String,
        minlength: 4
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    borrowedBooks: [{
        code: String,
        bookName: String,
    }],
});


export const User = model('users', userSchema);