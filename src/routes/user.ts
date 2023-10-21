import { Router } from "express";
import * as controller from "../controllers/user";

const router = Router();

router.post("/users", controller.createUser);
router.get("/users/:userId", controller.getUserById);
router.get("/users", controller.getAllUsers);
router.put("/users/:userId", controller.updateUser);
router.delete("/users/:userId", controller.deleteUser);

export default router;
