import { Router } from "express";
import { updateUser, getAllUsers, getUserId } from "../controllers/users.controller.js";

import { authToken } from "../middlewares/authToken.js";

const router = Router();

router.get("/update", updateUser);

router.get("/getUserId/:id", authToken, getUserId);
router.get("/getAll", authToken, getAllUsers);

export default router;
