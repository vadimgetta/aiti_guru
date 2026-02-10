import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { AddProduct, Pagination } from "@/features";
import { Container, FallbackLoader, Heading } from "@/shared/components";
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
	const pageParam = parseInt(searchParams.get("page") ?? "1", 10);
	const page = pageParam > 0 ? pageParam : 1;
	const skip = (page - 1) * limit;

	const { data, isFetched, isLoading, isError } = useQuery<IProductResponse>({
		queryKey: [QUERY_KEYS.PRODUCTS, search, sortBy, order, page],
		queryFn: () => getProducts({ search, limit, skip, sortBy, order }),
		placeholderData: (previousData) => previousData
	});
	const to = Math.min(page * limit, data?.total ?? 0);
	const from = (page - 1) * limit + 1;

	if (isError) {
		return <p>Что то пошло не так</p>;
	}

	return (
		<div className={styles.wrapper}>
			{isLoading && <FallbackLoader />}
			{data && (
				<Container>
					<div className={styles.inner}>
						<div className={styles.top}>
							<Heading level={3}>Все позиции</Heading>
							<AddProduct />
						</div>
						{data.products.length > 0 ? (
							<>
								<ProductsTable data={data} isLoading={!isFetched} />
								<Pagination
									currentPage={page}
									totalItems={data.total}
									pageSize={limit}
									from={from}
									to={to}
									total={data.total}
								/>
							</>
						) : (
							<div className={styles.empty}>Ничего не нашлось</div>
						)}
					</div>
				</Container>
			)}
		</div>
	);
};

// import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
// import { useMemo } from "react";
// import { useSearchParams } from "react-router";

// import { AddProduct } from "@/features";
// import { Button, Container, FallbackLoader, Heading, Spinner } from "@/shared/components";
// import { QUERY_KEYS } from "@/shared/config";
// import type { IProductResponse } from "@/shared/model";

// import { getProducts } from "./api/get-products";
// import { ProductsTable } from "./components/products-table/products-table";
// import styles from "./styles.module.scss";

// export const ProductsPage = () => {
// 	const [searchParams] = useSearchParams();
// 	const search = searchParams.get("q") ?? "";
// 	const sortBy = searchParams.get("sortBy") ?? "";
// 	const order = searchParams.get("order") ?? "";
// 	const limit = 10;
// 	const pageParam = parseInt(searchParams.get("page") ?? "1", 10);
// 	const page = pageParam > 0 ? pageParam : 1;
// 	const skip = (page - 1) * limit;

// 	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isFetched } =
// 		useInfiniteQuery<
// 			IProductResponse,
// 			Error,
// 			InfiniteData<IProductResponse>,
// 			[string, string, string, string],
// 			number
// 		>({
// 			queryKey: [QUERY_KEYS.PRODUCTS, search, sortBy, order],
// 			queryFn: ({ pageParam = 0 }) =>
// 				getProducts({ search, limit, skip: pageParam, sortBy, order }),
// 			getNextPageParam: (lastPage, allPages) => {
// 				const loaded = allPages.reduce(
// 					(acc, page) => acc + page.products.length,
// 					0
// 				);
// 				return loaded < lastPage.total ? loaded : undefined;
// 			},
// 			initialPageParam: 0,
// 			placeholderData: (prev) => prev
// 		});
// 	const shownCount = useMemo(
// 		() => data?.pages.reduce((acc, page) => acc + page.products.length, 0),
// 		[data?.pages]
// 	);

// 	if (status === "pending") {
// 		return <FallbackLoader />;
// 	}
// 	if (status === "error") {
// 		return <p>Что то пошло не так</p>;
// 	}

// 	return (
// 		<div className={styles.wrapper}>
// 			<Container>
// 				<div className={styles.inner}>
// 					<div className={styles.top}>
// 						<Heading level={3}>Все позиции</Heading>
// 						<AddProduct />
// 					</div>
// 					<ProductsTable
// 						data={data}
// 						isLoading={!isFetched || isFetchingNextPage}
// 					/>
// 					{data.pages.length > 0 && (
// 						<div className={styles.bottom}>
// 							<div className={styles.info}>
// 								<span className={styles.info__gray}>Показоно </span>
// 								<span className={styles.info__black}>
// 									1 - {shownCount}{" "}
// 								</span>
// 								<span className={styles.info__gray}>из </span>
// 								<span className={styles.info__black}>
// 									{data.pages[0].total}
// 								</span>
// 							</div>
// 							{hasNextPage && (
// 								<div className={styles.loadMore}>
// 									<Button
// 										appearance="primary"
// 										onClick={() => fetchNextPage()}
// 										disabled={isFetchingNextPage}
// 										size="lg"
// 									>
// 										{isFetchingNextPage ? (
// 											<Spinner size="sm" appearence="secondary" />
// 										) : (
// 											"Загрузить ещё"
// 										)}
// 									</Button>
// 								</div>
// 							)}
// 						</div>
// 					)}
// 				</div>
// 			</Container>
// 		</div>
// 	);
// };
