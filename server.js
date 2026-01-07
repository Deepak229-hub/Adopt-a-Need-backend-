import "./config/env.js"
import express from "express";
import router from "./routers/auth-router.js";
import pool from "./database/pg.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());
app.use("/api/auth", router);

app.get("/", (req, res) => {
    res.status(200).json({msg: "Welcome"});
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`server is listening at port ${PORT}`);
});
