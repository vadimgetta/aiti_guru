import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { AddProduct } from "@/features";
import { Button, Container, FallbackLoader, Heading, Spinner } from "@/shared/components";
import { QUERY_KEYS } from "@/shared/config";
import type { IProductResponse } from "@/shared/model";

import { getProducts } from "./api/get-products";
import { ProductsTable } from "./components/products-table/products-table";
import styles from "./styles.module.scss";

export const ProductsPage = () => {
	const [searchParams] = useSearchParams();
	const search = searchParams.get("q") ?? "";
	const sortBy = searchParams.get("sortBy") ?? "";
	const order = searchParams.get("order") ?? "";
	const limit = 10;

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isFetched } =
		useInfiniteQuery<
			IProductResponse,
			Error,
			InfiniteData<IProductResponse>,
			[string, string, string, string],
			number
		>({
			queryKey: [QUERY_KEYS.PRODUCTS, search, sortBy, order],
			queryFn: ({ pageParam = 0 }) =>
				getProducts({ search, limit, skip: pageParam, sortBy, order }),
			getNextPageParam: (lastPage, allPages) => {
				const loaded = allPages.reduce(
					(acc, page) => acc + page.products.length,
					0
				);
				return loaded < lastPage.total ? loaded : undefined;
			},
			initialPageParam: 0,
			placeholderData: (prev) => prev
		});

	if (status === "pending") {
		return <FallbackLoader />;
	}
	if (status === "error") {
		return <p>Error loading products</p>;
	}

	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.inner}>
					<div className={styles.top}>
						<Heading level={3}>Все позиции</Heading>
						<AddProduct />
					</div>
					<ProductsTable
						data={data}
						isLoading={!isFetched || isFetchingNextPage}
					/>
					<div className={styles.bottom}>
						{hasNextPage && (
							<Button
								appearance="primary"
								onClick={() => fetchNextPage()}
								disabled={isFetchingNextPage}
								size="lg"
							>
								{isFetchingNextPage ? (
									<Spinner size="sm" appearence="secondary" />
								) : (
									"Загрузить ещё"
								)}
							</Button>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
