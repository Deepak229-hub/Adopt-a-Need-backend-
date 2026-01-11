import express from "express";
import controller from "../controllers/children-controller.js";
import verify from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(verify, controller.getChildren);

router.route("/addchild").post(verify, controller.createChild);

router.route("/updatechild").post(verify, controller.updateChild);

router.route("/removechild").post(verify, controller.removeChild);

export default router;