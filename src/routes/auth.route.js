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

authRoute.get("/registerError", (req, res) => {
  console.log("registerError -> ", req);
  res.render("register-error", { error });
});

authRoute.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "loginError" }),
  loginPassport
);

authRoute.get("/loginError", (req, res) => {
  const err =  {message : req.flash('loginMessage')};
  res.render("login-error", {err});
});
export default authRoute;
