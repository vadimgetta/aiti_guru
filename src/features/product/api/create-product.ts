import { instanceAxios } from "@/shared/api";
import { PRODUCTS_ROUTE } from "@/shared/config";
import type { IProduct } from "@/shared/model";

import type { IProductForm } from "../model/add-product-form";

export const createProduct = async (body: IProductForm): Promise<IProduct> => {
	try {
		const { data } = await instanceAxios.post<IProduct>(`${PRODUCTS_ROUTE}/add`, {
			...body
		});
		return { ...data, thumbnail: "" };
	} catch {
		throw new Error("Product not created");
	}
};
