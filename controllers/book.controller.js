import { Book } from '../models/book.model.js';
import { User } from '../models/user.model.js';


export const getAllBooks = async (req, res, next) => {
    try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const filter = {};

        if (req.query.title) {
            filter.title = { $regex: req.query.title, $options: 'i' };
        }

        const books = await Book.find(filter).skip((page - 1) * limit).limit(limit);

        res.json(books);
    }
    catch (error) {
        next({ status: 500, error: new Error('Server Error'), type: 'server error' });
    }
};

export const getBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return next({ status: 404, error: new Error('The book is not found'), type: 'resource not found error' });
        }

        res.json(book);
    }
    catch (error) {
        next({ status: 500, error: new Error('Server Error'), type: 'server error' });
    }
};

export const getBooksByCategory = async (req, res, next) => {
    try {
        const { categoryName } = req.params;
        const books = await Book.find({ category: categoryName });

        res.json(books);
    }
    catch (error) {
        next({ status: 500, error: new Error('Server Error'), type: 'server error' });
    }
};

export const addBook = async (req, res, next) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();

        res.json(newBook);
    }
    catch (error) {
        next({ status: 500, error: new Error('Server Error'), type: 'server error' });
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        if (!book) {
            return next({ status: 404, error: new Error('The book is not found'), type: 'resource not found error' });
        }

        res.json(book);
    }
    catch (error) {
        next({ status: 500, error: new Error('Server Error'), type: 'server error' });
    }
};

export const borrowBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return next({ status: 404, error: new Error('The book is not found'), type: 'resource not found error' });
        }

        if (book.isBorrowed) {
            return next({ status: 400, error: new Error('Book already borrowed'), type: 'bad request' });
        }

        const user = await User.findById(req.body.userId);

        if (!user) {
            return next({ status: 404, error: new Error('The user is not found'), type: 'resource not found error' });
        }

        book.isBorrowed = true;
        user.borrowedBooks.push({ code: book._id.toString(), bookName: book.title });

        await book.save();
        await user.save();

        res.json(book);
    }
    catch (error) {
        next({ status: 500, error: new Error('Server Error'), type: 'server error' });
    }
};

export const returnBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return next({ status: 404, error: new Error('The book is not found'), type: 'resource not found error' });
        }

        const user = await User.findOne({ "borrowedBooks.code": req.params.id });

        if (user) {
            user.borrowedBooks = user.borrowedBooks.filter(b => b.code !== req.params.id);

            await user.save();
        }

        book.isBorrowed = false;

        await book.save();

        res.json(book);
    }
    catch (error) {
        next({ status: 500, error: new Error('Server Error'), type: 'server error' });
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return next({ status: 404, error: new Error('The book is not found'), type: 'resource not found error' });
        }

        res.status(204).send();
    }
    catch (error) {
        next({ status: 500, error: new Error('Server Error'), type: 'server error' });
    }
};