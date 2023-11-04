import { Router } from "express";
import * as controller from "../controllers/authentication";

const router = Router();

router.post("/auth/login", controller.signIn);
router.post("/auth/register", controller.signUp);

export default router;
