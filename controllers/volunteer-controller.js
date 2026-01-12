import pool from "../database/pg.js";

const getVolunteers = async (req, res) => {
    try {
        if(!req.user.isadmin) return res.status(400).json({msg: "Bad Request"});
        const result = await pool.query("SELECT * FROM VOLUNTEERS");
        console.log(result);
        
        return res.status(200).json({msg: result.rows});
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error"});
    }
};

const addVolunteer = async (req, res) => {
    try {
        if(!req.user.isadmin) return res.status(400).json({msg: "Bad Request"});
        const {name, email, phone, avl_on, address} = req.body;
        const result = await pool.query("INSERT INTO VOLUNTEERS (NAME, EMAIL, PHONE, AVL_ON, ADDRESS) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, email, phone, avl_on, address]);
        console.log(result.rows);
        return res.status(200).json({msg: result.rows});
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error"});
    }
};

const updateVolunteer = async (req, res) => {
    try {
        if(!req.user.isadmin) return res.status(400).json({msg: "Bad Request"});
        const {id, name, email, phone, avl_on, address} = req.body;
        const result = await pool.query("UPDATE VOLUNTEERS SET NAME = $1, EMAIL = $2, PHONE = $3, AVL_ON = $4, ADDRESS = $5 WHERE ID = $6 RETURNING *", [name, email, phone, avl_on, address, id]);
        console.log(result.rows[0]);
        return res.status(200).json({msg: result.rows[0]});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Internal Server Error"});
    }
};

const deleteVolunteer = async (req, res) => {
    try {
        if(!req.user.isadmin) return res.status(400).json({msg: "Bad Request"});
        const {id} = req.body;
        const result = await pool.query("DELETE FROM VOLUNTEERS WHERE ID = $1", [id]);
        return res.status(200).json({msg: "Volunteer removed"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Internal Server Error"});
    }
};

export default {getVolunteers, addVolunteer, updateVolunteer, deleteVolunteer};