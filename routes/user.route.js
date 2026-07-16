import { Router } from "express";
import { sign_up, sign_in, getAllUsers } from "../controllers/user.controller.js";
import { logGetRequests, validate } from '../middlewares/index.middleware.js';
import { userSchema, loginSchema } from '../schemas/joiSchemas.js';


const router = Router();

router.post('/', validate(userSchema), sign_up);
router.post('/sign-in', validate(loginSchema), sign_in);
router.get('/', logGetRequests, getAllUsers);

export default router;