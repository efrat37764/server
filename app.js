import express from 'express'
import { books } from './db.js';

const app = express();
app.use(express.json());

app.get('/books', (req, res) => {
    res.send(books);
});

app.get('/books/:id', (req, res) => {
    let book = books.find(b => b.id == req.params.id);
    if (!book) {
        res.status(404).send("The book is not found");
    }
    else {
        res.send(book);
    }
});

app.post('/books', (req, res) => {
    books.push(req.body);
    res.send(books);
});

app.put('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) {
        res.status(404).send("The book is not found");
    }
    else {
        books[index] = req.body;
        res.send(books[index]);
    }
});

app.patch('/books/:id/borrow', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1 || books[index].isBorrowed) {
        res.status(404).send("The book is not available");
    }
    else {
        books[index].isBorrowed = true;
        books[index].borrowing.push({ borrowingDate: new Date().toString(), customerId: req.body.customerId });
        res.send(books[index]);
    }
});

app.patch('/books/:id/return', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) {
        res.status(404).send("The book is not found");
    }
    else {
        books[index].isBorrowed = false;
        res.send(books[index]);
    }
});

app.delete('/books/:id', (req, res)=>{
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) {
        res.status(404).send("The book is not found");
    }
    else{
        books.splice(index, 1);
        res.status(204).send();
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000')
});