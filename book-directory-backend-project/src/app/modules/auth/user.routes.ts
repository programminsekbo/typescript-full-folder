import { Router } from "express";
import { loginUser, registerUser } from "./user.controller";

const router = Router();

router.post("/register", registerUser)
router.post("/login", loginUser)

export const UserRoutes = router;