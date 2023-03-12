import { login, loginPage, logout, register, registerPage } from "../controllers/auth.controller.js";
import { Router } from "express";
import { sessionValidation } from "../middlewares/index.js";

const authRoute = Router();

authRoute.get("/login", sessionValidation, loginPage);
authRoute.get("/register", sessionValidation, registerPage);
authRoute.get("/logout", logout);

authRoute.post("/login", sessionValidation, login);
authRoute.post("/register", sessionValidation, register);

export default authRoute;
