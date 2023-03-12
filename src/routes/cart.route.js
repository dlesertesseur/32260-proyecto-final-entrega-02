import {
  getAll,
  findById,
  insert,
  update,
  remove,
  addProduct,
  removeProduct,
  updateProduct,
  getCartsList,
} from "../controllers/cart.controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middlewares/index.js";

const cartRoute = Router();

cartRoute.get("/", isAuthenticated, getAll);
cartRoute.get("/list", isAuthenticated, getCartsList);
cartRoute.get("/:cid", isAuthenticated, findById);

cartRoute.post("/", isAuthenticated, insert);
cartRoute.post("/:cid/products/:pid", isAuthenticated, addProduct);

cartRoute.put("/:cid/", isAuthenticated, update);
cartRoute.put("/:cid/products/:pid", isAuthenticated, updateProduct);

cartRoute.delete("/:cid", isAuthenticated, remove);
cartRoute.delete("/:cid/products/:pid", isAuthenticated, removeProduct);

export default cartRoute;
