import { Context, helpers } from "../../deps.ts";
import logger from "../middlewares/logger.ts";
import { Product } from "../types/product.type.ts";  
import { DB_PRODUCTS } from "../data/products.data.ts";

export const findAll = async (ctx: Context) => {
    try {
        ctx.response.status = 200;
        logger.debug(`status: ${ctx.response.status} method: findAll handler`);

        ctx.response.body = await {code: '00', data: DB_PRODUCTS};
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const findProduct = async (ctx: Context) =>{
    try {
        const { productId } = helpers.getQuery(ctx, {mergeParams: true});
        const product = await DB_PRODUCTS.find((p) => p.uuid == productId);

        if (product) {
            ctx.response.body = await {code: '00', data: product};
        } else {
            ctx.response.body = await {code: '01', msg: `Producto con id ${productId} no encontrado.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const createProduct = async (ctx: Context) => {
    try {
        ctx.response.status = 201;
        logger.debug(`status: ${ctx.response.status} method: createProduct handler`);


        const { name, price, stock, description, image, category } = await ctx.request.body().value;

        const newId = Number(DB_PRODUCTS[DB_PRODUCTS.length - 1].uuid) + 1;

        const product: Product = {
            uuid: newId.toString(),
            name,
            price,
            stock,
            description,
            image,
            category,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        DB_PRODUCTS.push(product);
        ctx.response.body = await {code: '00', data: product};


    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}
export const updateProduct = async (ctx: Context) => {
    try {
        const { productId } = helpers.getQuery(ctx, {mergeParams: true});
        const product = await DB_PRODUCTS.find((p) => p.uuid == productId);

        if (product) {
            const { name, price, stock, description, image, category } = await ctx.request.body().value;

            product.name = name;
            product.price = price;
            product.stock = stock;
            product.description = description;
            product.image = image;
            product.category = category;
            product.updatedAt = new Date();
            ctx.response.body = await {code: '00', data: product};
        } else {
            ctx.response.body = await {code: '01', msg: `Producto con id ${productId} no encontrado.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const deleteProduct = async (ctx: Context) => {
    try {
        const { productId } = helpers.getQuery(ctx, {mergeParams: true});
        const product = await DB_PRODUCTS.find((p) => p.uuid == productId);

        if (product) {
            const index = DB_PRODUCTS.indexOf(product);
            DB_PRODUCTS.splice(index, 1);
            ctx.response.body = await {code: '00', data: product};
        } else {
            ctx.response.body = await {code: '01', msg: `Producto con id ${productId} no encontrado.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}
