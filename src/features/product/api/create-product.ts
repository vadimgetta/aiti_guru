import { instanceAxios } from "@/shared/api";
import { PRODUCTS_ROUTE } from "@/shared/config";
import type { IProduct } from "@/shared/model";

import type { IProductForm } from "../model/add-product-form";

export const createProduct = async (data: IProductForm) => {
	try {
		const response = await instanceAxios.post<IProduct>(`${PRODUCTS_ROUTE}/add`, {
			data
		});
		return response.data;
	} catch (e) {
		console.error(e);
	}
};
