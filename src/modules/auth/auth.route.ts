import { Router } from "express";
import authControllers from "./auth.controller.js";

const router = Router();

router.post("/signup", authControllers.createUser);
router.post("/login", authControllers.loginUser);

const authRoutes = router;
export default authRoutes;
