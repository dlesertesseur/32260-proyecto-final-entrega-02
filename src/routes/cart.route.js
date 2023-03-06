import {
  getAll,
  findById,
  insert,
  update,
  remove,
  addProduct,
  removeProduct,
  updateProduct,
} from "../controllers/cart.controller.js";
import { Router } from "express";

const cartRoute = Router();

cartRoute.get("/", getAll);

cartRoute.get("/:cid", findById);

cartRoute.post("/", insert);

cartRoute.put("/:cid/", update);

cartRoute.delete("/:cid", remove);

cartRoute.post("/:cid/product/:pid", addProduct);

cartRoute.delete("/:cid/product/:pid", removeProduct);

cartRoute.put("/:cid/product/:pid", updateProduct);

export default cartRoute;
