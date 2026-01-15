import "./config/env.js"
import express from "express";
import authRouter from "./routers/auth-router.js";
import childrenRouter from "./routers/children-router.js";
import pool from "./database/pg.js";
import cors from "cors";
import volunteerRouter from "./routers/volunteer-router.js";
import donationRouter from "./routers/donation-router.js";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/children", childrenRouter);
app.use("/api/volunteer", volunteerRouter);
app.use("/api/order", donationRouter);

app.get("/", (req, res) => {
    res.status(200).json({msg: "Welcome"});
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`server is listening at port ${PORT}`);
});
