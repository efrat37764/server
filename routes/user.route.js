import { Router } from "express";
import { users } from "../users.js";

const router = Router();

router.post('/', (req, res) => {
    users.push(req.body);
    res.json(req.body);
});

router.post('/sign-in', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        res.status(401).send("Invalid email or password");
    }
    else {
        res.json(user.id);
    }
});

router.get('/', (req, res) => {
    res.json(users);
})

export default router;