import { Router } from "express";
import { sign_up, sign_in, getAllUsers } from "../controllers/user.controller.js";
import { logGetRequest } from '../middlewares/index.middleware.js';


const router = Router();

router.post('/', sign_up);
router.post('/sign-in', sign_in);
router.get('/', logGetRequest, getAllUsers);

export default router;