import pool from "../database/pg.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const userExists = await pool.query("SELECT * FROM USERS WHERE EMAIL = $1", [email]);

        if (userExists.rows.length > 0) return res.status(400).json({ msg: "user already exists" });

        const saltRounds = 10;

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const userCreated = await pool.query("INSERT INTO USERS (username, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *", [username, email, phone, hashPassword]);

        console.log(userCreated.rows[0]);

        res.status(201).json({ msg: "registration successful", token: await pool.generateToken(userCreated.rows[0]) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await pool.query("SELECT * FROM USERS WHERE EMAIL = $1", [email]);

        if (userExists.rows.length == 0) return res.status(400).json({msg: "invalid credentials"});

        const user = await pool.query("SELECT * FROM USERS WHERE EMAIL = $1", [email]);
        
        const loggedIn = await bcrypt.compare(password, user.rows[0].password);

        if (loggedIn) return res.status(200).json({msg: "user logged in", token: await pool.generateToken(user.rows[0]), userId: user.rows[0].id});
        else return res.status(400).json({msg: "invalid credentials"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "internal server error"});
    }
}

const user = async (req, res) => {
    try {
        return res.status(200).json({msg: req.user});
    } catch (error) {
        return res.status(400).json({msg: "error"})
    }
}

const updateuser = async (req, res) => {
    try {
        const info = req.body;
        console.log("user: ",req.user);
        console.log("body: ",req.body);
        
        
        const updateInfo = await pool.query("UPDATE USERS SET EMAIL = $1, PHONE = $2 WHERE EMAIL = $3 RETURNING *", [info.email, info.phone, req.user.email]);

        return res.status(200).json({msg: "user data updated", details: updateInfo.rows[0], token: await pool.generateToken(updateInfo.rows[0])});
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({msg: "internal server error"})
    }
}
export default { register, login, user, updateuser };