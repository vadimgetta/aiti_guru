import type { IProduct } from "@/shared/model";

export interface IProductForm extends Omit<IProduct, "id" | "thumbnail"> {}
