import express from "express";
import verify from "../middlewares/authMiddleware.js";
import controller from "../controllers/volunteer-controller.js"

const router = express.Router();

router.route("/").get(verify, controller.getVolunteers);

router.route("/add").post(verify, controller.addVolunteer);

router.route("/update").post(verify, controller.updateVolunteer);

router.route("/delete").post(verify, controller.deleteVolunteer);

export default router;