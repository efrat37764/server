import 'dotenv/config';

export const env = {
    MONGO_URL: process.env.MONGO_URL,
    BCRYPT_ROUNDS: +process.env.BCRYPT_ROUNDS,
    PORT: +process.env.PORT,
};