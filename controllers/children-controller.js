import pool from "../database/pg.js"

const getChildren = async (req, res) => {
    try {
        console.log(req.user.isadmin);
        if(!req.user.isadmin) res.status(400).json({msg: "Bad Request"});
        
        const result = await pool.query("SELECT * FROM CHILDREN ORDER BY NAME ASC");
        const children = result.rows;
        return res.status(200).json(children);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "An error occured"});
    }
};

const createChild = async (req, res) => {
    try {
        if(!req.user.isadmin) return res.status(400).json({msg: "Bad Request"});
        const {name, dob, gender, status} = req.body;
        const result = await pool.query("INSERT INTO CHILDREN (NAME, DOB, GENDER, STATUS) VALUES ($1, $2, $3, $4) RETURNING *", [name, dob, gender, status]);
        return res.status(200).json({msg: result.rows[0]});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "An error occured"});
    }
};

const updateChildren = async (req, res) => {
    try {
        if (!req.user.isadmin) return res.status.json({msg: "Bad Request"});
        const {id, name, dob, gender, status} = req.body;
        const result = await pool.query("UPDATE CHILDREN SET NAME = $1, DOB = $2, GENDER = $3, STATUS = $4 WHERE ID = $5 RETURNING *", [name, dob, gender, status, id]);
        return res.status(200).json({msg: result.rows[0]});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "An error occured"});
    }
}

export default {getChildren, createChild, updateChildren};