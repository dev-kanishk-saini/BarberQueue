import { Router } from "express";
import { createuser } from "../controllers/user-controllers.js";

const router = Router();

router.post("/register",createuser);
//router.post("/login",loginUser);
// router.post("/logout",logoutUser);
// router.delete("/delete",deleteUser);
export default router;