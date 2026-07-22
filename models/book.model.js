import { model, Schema } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        unique: true,
        minlength: 2,
        maxlength: 20
    },
    price: Number,
    category: {
        type: [String],
        enum: ['Adults', 'youth', 'Children', 'Science', 'History', 'Comics']
    },
    author: {
        name: String,
        phone: String,
        email: String,
    },
});


export const Book = model('books', bookSchema);