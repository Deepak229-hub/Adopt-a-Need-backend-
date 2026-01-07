import express from "express";
import authConrollers from "../controllers/auth-controller.js";
import validate from "../middlewares/validate-middleware.js";
import signupSchema from "../validators/auth-validator.js";
import loginSchema from "../validators/login-validator.js";
import verify from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(validate(signupSchema), authConrollers.register);

router.route("/login").post(validate(loginSchema), authConrollers.login);

router.route("/user").get(verify, authConrollers.user);

router.route("/updateuser").post(verify, authConrollers.updateuser);

export default router;