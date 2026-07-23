import { Router } from "express";
import { getAllBooks, getBooksByCategory, getBook, addBook, updateBook, borrowBook, returnBook, deleteBook } from '../controllers/book.controller.js';
import { logGetRequests } from '../middlewares/index.middleware.js';
import { validate } from "../middlewares/validate.middleware.js";
import { bookSchema } from '../schemas/books&users.scema.js';

const router = Router();

router.get('/', logGetRequests, getAllBooks);
router.get('/category/:categoryName', logGetRequests, getBooksByCategory);
router.get('/:id', logGetRequests, getBook);
router.post('/', validate(bookSchema), addBook);
router.put('/:id', validate(bookSchema), updateBook);
router.patch('/borrow/:id', borrowBook);
router.patch('/return/:id', returnBook);
router.delete('/:id', deleteBook);

export default router;