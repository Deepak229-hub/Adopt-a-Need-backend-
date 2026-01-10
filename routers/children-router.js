import express from "express";
import controller from "../controllers/children-controller.js";
import verify from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(verify, controller.getChildren);

router.route("/addchild").post(verify, controller.createChild);

router.route("/updatechildren").post(verify, controller.updateChildren);

export default router;