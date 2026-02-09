import clsx from "clsx";
import { useSearchParams } from "react-router";

import { Heading } from "@/shared/components";
import type { IProductResponse } from "@/shared/model";

import { productTableHeader } from "../../model/product-table-header";
import { updateSortSearchParams } from "../../utils/sort";
import { ProductItem } from "../product-item/product-item";

import type { IProductTableProps } from "./product-table.props";
import styles from "./styles.module.scss";

export const ProductsTable = ({ data, isLoading }: IProductTableProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentSortBy = searchParams.get("sortBy");
	const currentOrder = searchParams.get("order");
	const handleSort = (id: string) => {
		setSearchParams(updateSortSearchParams(searchParams, id));
	};
	return (
		<table className={clsx(styles.table, { [styles.loading]: isLoading })}>
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
					{productTableHeader.map((item) => {
						const isActive = currentSortBy === item.id;
						const triangle =
							isActive && currentOrder === "asc"
								? "▲"
								: isActive && currentOrder === "desc"
									? "▼"
									: "";
						return (
							<th
								key={item.id}
								onClick={() => item.sorted && handleSort(item.id)}
								className={clsx({ [styles.sorted]: item.sorted })}
							>
								<div className={styles.label}>
									<Heading level={6}>{item.label}</Heading>
									{triangle ? <span>{triangle}</span> : null}
								</div>
							</th>
						);
					})}
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
