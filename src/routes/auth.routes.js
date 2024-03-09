import { Router } from "express";
import { login, register } from "../controllers/auth/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/users.validators.js";

const router = Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

export default router;
