import { model, Schema } from "mongoose";

const bookSchema = new Schema({
    title: String,
    price: Number,
    category: [String],
    author: {
        name: String,
        phone: String,
        email: String,
    },
});

export const Book = model('books', bookSchema);