import { Router } from "express";
 import { createSalon , getSalons } from "../controllers/salon-controllers.js";

 const router = Router();


 router.get("/", getSalons);

 router.post("/register", createSalon);
//  router.get("/profile/:id",getUserProfile);
//  router.put("/profile/:id",updateUserProfile);
//  router.delete("/profile/:id",deleteUserProfile);


 export default router;