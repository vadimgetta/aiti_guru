import { instanceAxios } from "@/shared/api";
import { PRODUCTS_ROUTE } from "@/shared/config";

import type { IProductResponse } from "../model/products";

export const getProducts = async ({
	search = "",
	limit = 10,
	skip = 0
}: {
	search?: string | null;
	limit?: number;
	skip?: number;
}) => {
	try {
		const url = search ? `${PRODUCTS_ROUTE}/search` : PRODUCTS_ROUTE;

		const { data } = await instanceAxios.get<IProductResponse>(url, {
			params: search ? { q: search, limit, skip } : { limit, skip }
		});

		return data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
