import { books } from './db.js';
import { users } from './users.js';


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
    let book = books.find(b => b.id == req.params.id);
    if (!book) {
        res.status(404).send("The book is not found");
    }
    else {
        res.json(book);
    }
};

export const addBook = (req, res, next) => {
    books.push(req.body);
    res.json(books);
};

export const updateBook = (req, res, next) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) {
        res.status(404).send("The book is not found");
    }
    else {
        books[index] = req.body;
        res.json(books[index]);
    }
};

export const borrowBook = (req, res, next) => {
    const bookIndex = books.findIndex(b => b.id == req.params.id);
    const user = users.find(u => u.id == req.body.customerId);

    if (bookIndex === -1 || books[bookIndex].isBorrowed || !user) {
        res.status(404).send("book not available or user not found");
    }
    else {
        books[bookIndex].isBorrowed = true;
        books[bookIndex].borrowing.push({ borrowingDate: new Date().toString(), customerId: req.body.customerId });

        user.borrowedBooks.push(books[bookIndex].id);

        res.json(books[bookIndex]);
    }
};

export const returnBook = (req, res, next) => {
    const bookIndex = books.findIndex(b => b.id == req.params.id);
    const user = users.find(u => u.id == req.body.customerId);

    if (bookIndex === -1 || !user) {
        return res.status(404).send("Book or user not found");
    }
    else {
        books[bookIndex].isBorrowed = false;
        user.borrowedBooks = user.borrowedBooks.filter(id => id != req.params.id);

        res.json(books[bookIndex]);
    }
};

export const deleteBook = (req, res, next) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) {
        res.status(404).send("The book is not found");
    }
    else {
        books.splice(index, 1);
        res.status(204).send();
    }
};