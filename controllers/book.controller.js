import { books } from '../db.js';
import { users } from '../users.js';


export const getAllBooks = (req, res, next) => {
    let result = [...books];

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;

    if (req.query.title) {
        result = result.filter(b => b.title.includes(req.query.title));
    }

    result = result.slice(((page - 1) * limit), (page * limit));
    res.json(result);
};

export const getBook = (req, res, next) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) {
        return next({ status: 404, error: new Error('The book is not found'), type: 'resource not found error' });
    }
    res.json(book);
};

export const addBook = (req, res, next) => {
    books.push(req.body);
    res.json(books);
};

export const updateBook = (req, res, next) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) {
        return next({ status: 404, error: new Error("The book is not found"), type: 'resource not found error' });
    }
    books[index] = req.body;
    res.json(books[index]);
};

export const borrowBook = (req, res, next) => {
    const bookIndex = books.findIndex(b => b.id == req.params.id);
    const user = users.find(u => u.id == req.body.customerId);

    if (bookIndex === -1 || books[bookIndex].isBorrowed || !user) {
        return next({ status: 404, error: new Error("book not available or user not found"), type: 'resource not found error' });
    }
    books[bookIndex].isBorrowed = true;
    books[bookIndex].borrowing.push({ borrowingDate: new Date().toString(), customerId: req.body.customerId });

    user.borrowedBooks.push(books[bookIndex].id);

    res.json(books[bookIndex]);
};

export const returnBook = (req, res, next) => {
    const bookIndex = books.findIndex(b => b.id == req.params.id);
    const user = users.find(u => u.id == req.body.customerId);

    if (bookIndex === -1 || !user) {
        return next({ status: 404, error: new Error("Book or user not found"), type: 'resource not found error' });
    }
    books[bookIndex].isBorrowed = false;
    user.borrowedBooks = user.borrowedBooks.filter(id => id != req.params.id);

    res.json(books[bookIndex]);
};

export const deleteBook = (req, res, next) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) {
        return next({ status: 404, error: new Error("The book is not found"), type: 'resource not found error' });
    }
    books.splice(index, 1);
    res.status(204).send();
};