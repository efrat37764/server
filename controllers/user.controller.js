import { User } from '../models/user.model.js';


export const sign_up = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();

        res.json(newUser);
    }
    catch (error) {
        next({ status: 500, error: new Error('Server Error'), type: 'server error' });
    }
};

export const sign_in = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return next({ status: 401, error: new Error("Invalid email or password"), type: 'authentication error' });
        }

        const isCorrect = await User.checkPassword(password, user.password);

        if (!isCorrect) {
            return next({ status: 401, error: new Error("Invalid email or password"), type: "authentication error" });
        }

        res.json(user);
    }
    catch (error) {
        next({ status: 500, error: new Error('Server Error'), type: 'server error' });
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        next({ status: 500, error: new Error('Server Error'), type: 'server error' });
    }
};