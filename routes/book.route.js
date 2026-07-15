import { Router } from "express";
import { books } from './db.js';
import { users } from './users.js';

const router = Router();

router.get('/', (req, res) => {
    let result = [...books];

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;

    if (req.query.title) {
        result = result.filter(b => b.title.includes(req.query.title));
    }

    result = result.slice(((page - 1) * limit), (page * limit));
    res.json(result);
});

router.get('/:id', (req, res) => {
    let book = books.find(b => b.id == req.params.id);
    if (!book) {
        res.status(404).send("The book is not found");
    }
    else {
        res.json(book);
    }
});

router.post('/', (req, res) => {
    books.push(req.body);
    res.json(books);
});

router.put('/:id', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) {
        res.status(404).send("The book is not found");
    }
    else {
        books[index] = req.body;
        res.json(books[index]);
    }
});

router.patch('/:id/borrow', (req, res) => {
    const bookIndex = books.findIndex(b => b.id == req.params.id);
    const user = users.find(u => u.id == req.body.customerId);

    if (bookIndex === -1 || books[bookIndex].isBorrowed || !user) {
        return res.status(404).send("book not available or user not found");
    }
    else {
        books[bookIndex].isBorrowed = true;
        books[bookIndex].borrowing.push({ borrowingDate: new Date().toString(), customerId: req.body.customerId });

        user.borrowedBooks.push(books[bookIndex].id);

        res.json(books[bookIndex]);
    }
});

router.patch('/:id/return', (req, res) => {
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
});

router.delete('/:id', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) {
        res.status(404).send("The book is not found");
    }
    else {
        books.splice(index, 1);
        res.status(204).send();
    }
});

export default router;