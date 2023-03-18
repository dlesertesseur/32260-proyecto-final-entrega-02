import {
  login,
  loginPage,
  loginPassport,
  logout,
  register,
  registerPassport,
  registerPage,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import { sessionValidation } from "../middlewares/index.js";
import passport from "passport";

const authRoute = Router();

authRoute.get("/login", sessionValidation, loginPage);
authRoute.get("/register", sessionValidation, registerPage);
authRoute.get("/logout", logout);

// authRoute.post("/login", sessionValidation, login);
// authRoute.post("/register", sessionValidation, register);

authRoute.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/registerError" }),
  registerPassport
);

authRoute.get("/registerError", (error) => {
  console.log("registerError -> ", error);
  res.render("register-error", { error });
});

authRoute.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/loginError" }),
  loginPassport
);

authRoute.get("/loginError", (error) => {
  console.log("loginError -> ", error);
  res.render("login-error", { error });
});
export default authRoute;
