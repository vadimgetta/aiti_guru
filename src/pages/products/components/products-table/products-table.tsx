import type { InfiniteData } from "@tanstack/react-query";

import { Heading } from "@/shared/components";
import type { IProductResponse } from "@/shared/model";

import { productTableHeader } from "../../model/product-table-header";
import { ProductItem } from "../product-item/product-item";

import styles from "./styles.module.scss";

export const ProductsTable = ({ data }: { data: InfiniteData<IProductResponse> }) => {
	return (
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
					{productTableHeader.map((item) => (
						<th key={item.id}>
							<Heading level={6}>{item.label}</Heading>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.pages.map((page: IProductResponse) =>
					page.products.map((product) => (
						<ProductItem key={product.id} item={product} />
					))
				)}
			</tbody>
		</table>
	);
};
