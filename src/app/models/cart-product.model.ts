import { Product } from "./product.model";

export class CartProduct {
  id?: number;
  price!: number;
  quantity!: number;
  product!: Product;
}
