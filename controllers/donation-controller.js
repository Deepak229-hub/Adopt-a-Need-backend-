import Razorpay from "razorpay";
import crypto from "crypto";
import pool from "../database/pg.js";
import sendReciept from "../utils/send-receipt.js";

const createOrder = async (req, res) => {
    try {
        let instance = new Razorpay({
            key_id: process.env.RZP_KEY_ID,
            key_secret: process.env.RZP_KEY_SECRET,
        });

        let options = req.body;

        options.amount *= 100;

        instance.orders.create(options, async (err, order) => {
            if (err) return res.status(500).json({msg: "An error occured while creating order"});
            const result = await pool.query("INSERT INTO DONATIONS (NAME, EMAIL, PHONE, AMOUNT, DOMAIN, ORDER_ID, STATUS) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [order.notes.name, order.notes.email, order.notes.phone, order.amount / 100, order.notes.domain, order.id, "created"]);
            return res.status(200).json(order);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "An error occured!"});
    }
};

const validateOrder = async (req, res) => {
    try {
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

        const hash = crypto.createHmac('sha256', process.env.RZP_KEY_SECRET);
        hash.update(`${razorpay_order_id}|${razorpay_payment_id}`);

        const generatedSignature = hash.digest('hex');

        if (generatedSignature !== razorpay_signature) return res.status(400).json({msg: "payment not valid"});

        const result = await pool.query("UPDATE DONATIONS SET STATUS = $1, PAYMENT_ID = $2 WHERE ORDER_ID = $3 AND STATUS = 'created' RETURNING *", ["paid", razorpay_payment_id, razorpay_order_id]);
        await sendReciept(result.rows[0]);

        return res.status(200).json({msg: "Transaction Successful", order_id: razorpay_order_id, payment_id: razorpay_payment_id});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "An error occured!"});
    }
}

export default {createOrder, validateOrder};