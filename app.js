import express from 'express'
import { books } from './db.js';

const app = express();
app.use(express.json());

app.get('/books', (req, res) => {
    res.send(books);
});

app.get('/books/:id', (req, res) => {
    let book = books.find(p => p.id == req.params.id);
    if (!book) {
        return res.status(404).send("The book is not found");
    }
    res.send(book);
});

app.post('/books', (req, res) => {
    books.push(req.body);
    res.send(books);
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000')
});