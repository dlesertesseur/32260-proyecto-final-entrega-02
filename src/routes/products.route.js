import {
  getAll,
  findById,
  update,
  insert,
  remove,
} from "../controllers/product.controller.js";
import { Router } from "express";

const productRoute = Router();

productRoute.get("/", getAll);

productRoute.get("/:pid", findById);

productRoute.post("/", insert);

productRoute.put("/:pid", update);

productRoute.delete("/:pid", remove);

export default productRoute;
