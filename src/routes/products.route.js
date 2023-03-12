import {
  getAll,
  findById,
  update,
  insert,
  remove,
  getProductsList,
} from "../controllers/product.controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middlewares/index.js";

const productRoute = Router();

productRoute.get("/", isAuthenticated, getAll);
productRoute.get("/list", isAuthenticated, getProductsList);

productRoute.get("/:pid", isAuthenticated, findById);

productRoute.post("/", isAuthenticated, insert);

productRoute.put("/:pid", isAuthenticated, update);

productRoute.delete("/:pid", isAuthenticated, remove);

export default productRoute;
