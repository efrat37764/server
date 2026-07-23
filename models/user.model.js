import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { env } from '../config/env.js';


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


userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    
    this.password = await bcrypt.hash(this.password, env.BCRYPT_ROUNDS);
});


userSchema.statics.checkPassword = async function (password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
};


userSchema.set('toJSON', {
    transform: (doc, ret) => {

        delete ret.password;
        delete ret.__v;

        ret.id = ret._id;
        delete ret._id;

        return ret;
    }
});


export const User = model('users', userSchema);