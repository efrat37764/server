import { Router } from "express";
import { sign_up, sign_in, getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.post('/', sign_up);
router.post('/sign-in', sign_in);
router.get('/', getAllUsers);

export default router;