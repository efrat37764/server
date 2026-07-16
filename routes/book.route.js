import { Router } from "express";
import { getAllBooks, getBook, addBook, updateBook, borrowBook, returnBook, deleteBook } from '../controllers/book.controller.js';
import { logGetRequest } from '../middlewares/index.middleware.js';

const router = Router();

router.get('/', logGetRequest, getAllBooks);
router.get('/:id', logGetRequest, getBook);
router.post('/', addBook);
router.put('/:id', updateBook);
router.patch('/:id/borrow', borrowBook);
router.patch('/:id/return', returnBook);
router.delete('/:id', deleteBook);

export default router;