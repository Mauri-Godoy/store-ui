import { CartProduct } from "./cart-product.model";

export class Cart {
  id?: number;
  createdAt?: Date;
  cartProducts?: CartProduct[];
  total?: number;
}
