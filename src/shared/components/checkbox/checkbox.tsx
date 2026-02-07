import clsx from "clsx";

import type { ICheckBoxProps } from "./checkbox.props";
import styles from "./styles.module.scss";

export const CheckBox = ({ className, ...props }: ICheckBoxProps) => {
	return (
		<div className={styles.wrapper}>
			<input
				type="checkbox"
				className={clsx(styles.checkbox, className)}
				{...props}
			/>
		</div>
	);
};
