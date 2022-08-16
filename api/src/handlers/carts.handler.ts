import { Context, helpers } from "../../deps.ts";
import logger from "../middlewares/logger.ts";
//import { Product } from "../types/product.type.ts";  
import { Cart } from "../types/cart.type.ts";
import { DB_CARTS } from "../data/carts.data.ts";    



export const findAll = async (ctx: Context) => {
    try {
        ctx.response.status = 200;
        logger.debug(`status: ${ctx.response.status} method: findAll handler`);

        ctx.response.body = await {code: '00', data: DB_CARTS};
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const findCart = async (ctx: Context) =>{
    try {
        const { cartId } = helpers.getQuery(ctx, {mergeParams: true});  
        const cart = await DB_CARTS.find((c) => c.uuid == cartId);

        if (cart) {
            ctx.response.body = await {code: '00', data: cart};
        } else {
            ctx.response.body = await {code: '01', msg: `Cart with id ${cartId} not found.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}



export const createCart = async (ctx: Context) => {
    try {
        ctx.response.status = 201;
        logger.debug(`status: ${ctx.response.status} method: createCart handler`);

        const { products, total } = await ctx.request.body().value;
        const newId = Number(DB_CARTS[DB_CARTS.length - 1].uuid) + 1;
        const cart: Cart = {
            uuid: newId.toString(),
            products,
            total,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        DB_CARTS.push(cart);
        ctx.response.body = await {code: '00', data: cart};
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const updateCart = async (ctx: Context) => {
    try {
        const { cartId } = helpers.getQuery(ctx, {mergeParams: true});
        const cart = await DB_CARTS.find((c) => c.uuid == cartId);
        if (cart) {
            const { products, total } = await ctx.request.body().value;
            cart.products = products;
            cart.total = total;
            cart.updatedAt = new Date();
            ctx.response.body = await {code: '00', data: cart};
        } else {
            ctx.response.body = await {code: '01', msg: `Cart with id ${cartId} not found.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const deleteCart = async (ctx: Context) => {
    try {
        const { cartId } = helpers.getQuery(ctx, {mergeParams: true});
        const cart = await DB_CARTS.find((c) => c.uuid == cartId);
        if (cart) {
            const index = DB_CARTS.indexOf(cart);
            DB_CARTS.splice(index, 1);
            ctx.response.body = await {code: '00', data: cart};
        } else {
            ctx.response.body = await {code: '01', msg: `Cart with id ${cartId} not found.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

