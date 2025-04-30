import { CartProduct } from './products.ts';

export type Order = {
  id: number;
  attributes: {
    address: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    name: string;
    orderTotal: string;
    "cartItems": CartProduct[],
    numItemsInCart: number
  }
}
