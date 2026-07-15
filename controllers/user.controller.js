import { users } from "../users.js";


export const sign_up = (req, res, next) => {
    users.push(req.body);
    res.json(req.body);
};

export const sign_in = (req, res, next) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        res.status(401).send("Invalid email or password");
    }
    else {
        res.json(user.id);
    }
};

export const getAllUsers = (req, res, next) => {
    res.json(users);
};