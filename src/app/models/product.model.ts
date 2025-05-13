import { Category } from "./category.model";

export class Product {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  category?: Category;
  imageUrl?: string;
}
