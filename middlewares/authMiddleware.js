import jwt from "jsonwebtoken";
import pool from "../database/pg.js";

const verify = async (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) return res.status(401).json({msg: "Token not provided"});

    const jwtToken = token.replace("Bearer ", "");
    console.log(jwtToken);

    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log(isVerified);
    
    let userData = await pool.query("SELECT id, username, email, phone, isAdmin FROM USERS WHERE EMAIL = $1", [isVerified.email]);
    userData = userData.rows[0]

    console.log(userData);
    req.user = userData;
    req.token = jwtToken;

    next();
};

export default verify;