import { Router } from "../../deps.ts";
import {
  findAll,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../handlers/products.handler.ts";

export const routerProduct = new Router()
  .get("/api/products", findAll)
  .get("/api/products/:productId", findProduct)
  .post("/api/products", createProduct)
  .put("/api/products/:userId", updateProduct)
  .delete("/api/products/:productId", deleteProduct);