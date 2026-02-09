import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { AddProduct } from "@/features";
import { Button, Container, FallbackLoader, Heading, Spinner } from "@/shared/components";
import { QUERY_KEYS } from "@/shared/config";
import type { IProductResponse } from "@/shared/model";

import { getProducts } from "./api/get-products";
import { ProductItem } from "./components/product-item/product-item";
import styles from "./styles.module.scss";

export const ProductsPage = () => {
	const [searchParams] = useSearchParams();
	const search = searchParams.get("q") ?? "";
	const limit = 10;

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useInfiniteQuery<
			IProductResponse,
			Error,
			InfiniteData<IProductResponse>,
			[string, string],
			number
		>({
			queryKey: [QUERY_KEYS.PRODUCTS, search],
			queryFn: ({ pageParam = 0 }) =>
				getProducts({ search, limit, skip: pageParam }),
			getNextPageParam: (lastPage, allPages) => {
				const loaded = allPages.reduce(
					(acc, page) => acc + page.products.length,
					0
				);
				return loaded < lastPage.total ? loaded : undefined;
			},
			initialPageParam: 0
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

					<table className={styles.table}>
						<colgroup>
							<col width={"25%"} />
							<col width={"15%"} />
							<col width={"15%"} />
							<col width={"15%"} />
							<col width={"15%"} />
							<col width={"15%"} />
							<col width={"15%"} />
						</colgroup>
						<thead className={styles.header}>
							<tr>
								<th>
									<Heading level={6}>Наименование</Heading>
								</th>
								<th>
									<Heading level={6}>Вендор</Heading>
								</th>
								<th>
									<Heading level={6}>Артикул</Heading>
								</th>
								<th>
									<Heading level={6}>Оценка</Heading>
								</th>
								<th>
									<Heading level={6}>Цена</Heading>
								</th>
								<th>
									<Heading level={6}>Количество</Heading>
								</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{data?.pages.map((page: IProductResponse) =>
								page.products.map((product) => (
									<ProductItem key={product.id} item={product} />
								))
							)}
						</tbody>
					</table>

					{hasNextPage && (
						<Button
							appearance="primary"
							onClick={() => fetchNextPage()}
							disabled={isFetchingNextPage}
						>
							{isFetchingNextPage ? (
								<Spinner size="sm" appearence="secondary" />
							) : (
								"Загрузить ещё"
							)}
						</Button>
					)}
				</div>
			</Container>
		</div>
	);
};
