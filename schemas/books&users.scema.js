import Joi from 'joi';


export const userSchema = Joi.object({
    username: Joi.string().trim().min(3).max(30).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/).required()
        .messages({
            'string.pattern.base': 'Password must contain uppercase, lowercase, number and special character',
            'string.min': 'Password must be at least 8 characters long'
        }),
    borrowedBooks: Joi.array().items(Joi.number().integer().positive()).default([])
});


export const bookSchema = Joi.object({
    title: Joi.string().trim().min(2).max(100).required(),
    author: Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        phone: Joi.string().trim().optional(),
        email: Joi.string().email().optional()
    }).required(),
    price: Joi.number().positive().precision(2).required()
});


export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required()
});