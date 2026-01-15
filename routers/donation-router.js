import express from "express";
import controller from "../controllers/donation-controller.js";

const router = express.Router();

router.route("/create").post(controller.createOrder);

router.route("/validate").post(controller.validateOrder);

export default router;