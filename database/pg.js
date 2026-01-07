import {Pool} from "pg";
import jwt from "jsonwebtoken";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const generateToken = async function (user) {
    try {
        return jwt.sign(
            {
                userId: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d',
            },
        );
    } catch (error) {
        console.log(error);
    }
};

export default {
        query: (text, params) => pool.query(text, params),
        generateToken,
};