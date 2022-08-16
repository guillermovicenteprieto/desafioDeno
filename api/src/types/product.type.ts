export type Uuid = string;

export interface Product {
    uuid: Uuid,
    name: string,
    price: number,
    stock: number
    description: string,
    image: string,
    category: string,
    createdAt: Date,
    updatedAt: Date
}
