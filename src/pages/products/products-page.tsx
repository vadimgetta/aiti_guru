import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { QUERY_KEYS } from "@/shared/config";

import { getProducts } from "./api/get-products";

export const ProductsPage = () => {
	const [searchParams] = useSearchParams();

	const search = searchParams.get("q") ?? "";

	const { data, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.PRODUCTS, search],
		queryFn: () => getProducts(search)
	});

	return (
		<div>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<ul>
					{data?.products.map((product) => (
						<li key={product.id}>
							<span>{product.title}</span>
							<span>{product.brand}</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
