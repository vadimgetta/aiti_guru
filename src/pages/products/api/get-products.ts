import { instanceAxios } from "@/shared/api";
import { PRODUCTS_ROUTE } from "@/shared/config";
import type { IProductResponse } from "@/shared/model";

export const getProducts = async ({
	search = "",
	limit = 10,
	skip = 0,
	sortBy,
	order
}: {
	search?: string | null;
	limit?: number;
	skip?: number;
	sortBy?: string;
	order?: string;
}): Promise<IProductResponse> => {
	try {
		const url = search ? `${PRODUCTS_ROUTE}/search` : PRODUCTS_ROUTE;

		const params: Record<string, string | number | undefined> = {
			limit,
			skip,
			sortBy,
			order,
			select: "thumbnail,id,title,category,brand,price,sku,rating,stock"
		};

		if (search) {
			params.q = search;
		}

		const { data } = await instanceAxios.get<IProductResponse>(url, {
			params
		});

		return data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
