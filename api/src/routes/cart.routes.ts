import { Router } from "../../deps.ts";
import {
  findAll,
  findCart,
  createCart,
  //updateCart,
  deleteCart,
} from "../handlers/carts.handler.ts";

export const routerCart= new Router()
  .get("/api/carts", findAll)
  .get("/api/carts/:cartId", findCart)
  .post("/api/carts", createCart)
  // .put("/api/carts/:userId", updateCart)
  .delete("/api/carts/:productId", deleteCart);