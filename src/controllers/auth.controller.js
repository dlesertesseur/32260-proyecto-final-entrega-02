import { authenticate, registerUser } from "../services/auth.service.js";
import { findCardByUserId, insertCart } from "../services/cart.service.js";
import { createHash } from "../util/Crypt.js";

const login = async (req, res) => {
  try {
    const user = await authenticate(req.body);
    req.session.email = user.email;
    req.session.first_name = user.first_name;
    req.session.last_name = user.last_name;
    req.session.age = user.age;

    /*Verifica si existe un carrito para el ususario */
    /*caso contrario crea uno */
    let cart = await findCardByUserId(user.id);

    if(!cart){
      const newCart = {
        user: user.id
      };
      cart = await insertCart(newCart);
    }

    req.session.cid = cart._id

    /*Validacion de rol*/
    if(req.body.email === "adminCoder@coder.com" && req.body.password === "adminCod3r123"){
      req.session.role = "admin";
    }else{
      req.session.role = "user";
    }

    res.redirect("../../api/products/list");
  } catch (error) {
    //res.status(error.status).send(error);
    res.render('login-error', { error })
  }
};

const register = async (req, res) => {
  try {
    const newUser = { ...req.body };
    newUser.password = createHash(newUser.password);

    const user = await registerUser(newUser);
    res.redirect("/api/auth/login");
  } catch (error) {
    //res.status(error.status).send({ message: error.message });
    res.render('register-error', { error })
  }
};

const loginPage = async (req, res) => {
  try {
    res.render("login", {
      title: "Login",
      style: "index.css",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const registerPage = async (req, res) => {
  try {
    res.render("register", {
      title: "Register",
      style: "index.css",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const logout = (req, res) => {
  req.session.destroy((error) => {
    res.redirect("/api/auth/login");
  });
};

export { register, login, registerPage, loginPage, logout };
