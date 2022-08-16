import { Product } from "./product.type.ts";
export type Uuid = string;


export interface Cart {
    uuid: Uuid,
    products: Product[],
    total: number,
    createdAt: Date,
    updatedAt: Date
}
