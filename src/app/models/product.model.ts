export class Product {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  quantity!: number;
  quantityToBuy: number = 1;
  category?: string;
  imageUrl?: string;
}
