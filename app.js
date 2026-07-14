import express from 'express'
import {books} from './db.js';

const app = express();
app.use(express.json());

app.get('/books', (req,res)=>{
    res.json(books);
});

app.get('/books/:id', (req,res)=>{
    let book = books.find(p=>p.id === parseInt(req.params.id));
    if (!book){
        res.status(404);
        res.send("The book is not found");
        return;
    }
    res.json(book);
});

app.post('/books', (req,res)=>{
    books.push(req.body);
    res.json(books);
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
});