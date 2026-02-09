import clsx from "clsx";

import { Heading } from "@/shared/components";
import { ThreeDotsIcon } from "@/shared/icons";
import type { IProduct } from "@/shared/model";

import styles from "./styles.module.scss";

export const ProductItem = ({ item }: { item: IProduct }) => {
	return (
		<tr className={styles.item}>
			<td>
				<div className={styles.info}>
					<img src={item.thumbnail} alt={item.title} width={48} height={48} />
					<div className={styles.label}>
						<Heading level={4}>{item.title}</Heading>
						<p>{item.category}</p>
					</div>
				</div>
			</td>
			<td>
				<Heading centred level={6}>
					{item.brand}
				</Heading>
			</td>
			<td className={clsx("centerText", styles.text)}>{item.sku}</td>
			<td className={clsx("centerText", styles.text)}>
				<span
					className={clsx({
						[styles.bad]: item.rating < 3
					})}
				>
					{item.rating}
				</span>
				/5
			</td>
			<td className={clsx("centerText", styles.text)}>{item.price}</td>
			<td className={clsx("centerText", styles.text)}>{item.stock}</td>
			<td>
				<button className={styles.button}>
					<ThreeDotsIcon />
				</button>
			</td>
		</tr>
	);
};
