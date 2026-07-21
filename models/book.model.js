import { model, Schema } from "mongoose";

const bookSchema = new Schema({
    name: String,
    price: Number,
    category: [String],
    auther: {
        name: String,
        phone: Number,
        email: String,
    },
});

export const Book = model('books', bookSchema);