import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { Button, Container, FallbackLoader, Heading } from "@/shared/components";
import { QUERY_KEYS } from "@/shared/config";

import { getProducts } from "./api/get-products";
import { ProductItem } from "./components/product-item/product-item";
import styles from "./styles.module.scss";

export const ProductsPage = () => {
	const [searchParams] = useSearchParams();

	const search = searchParams.get("q") ?? "";

	const { data, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.PRODUCTS, search],
		queryFn: () => getProducts(search)
	});

	return (
		<div className={styles.wrapper}>
			<Container>
				{isLoading ? (
					<FallbackLoader />
				) : (
					<div className={styles.inner}>
						<div className={styles.top}>
							<Heading level={3}>Все позиции</Heading>
							<Button appearance="primary"> Добавить</Button>
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
								{data?.products.map((product) => (
									<ProductItem key={product.id} item={product} />
								))}
							</tbody>
						</table>
					</div>
				)}
			</Container>
		</div>
	);
};
