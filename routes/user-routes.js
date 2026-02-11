import { Router } from "express";
 import { createUser , getUserProfile , updateUserProfile , deleteUserProfile, loginUser} from "../controllers/user-controllers.js";

 const router = Router();

 router.post("/register",createUser);
 router.get("/profile/:id",getUserProfile);
 router.put("/profile/:id",updateUserProfile);
 router.delete("/profile/:id",deleteUserProfile);

router.post("/login", loginUser);
// router.post("/logout",logoutUser);
// // router.delete("/delete",deleteUser);
 export default router;