import clsx from "clsx";

import type { ISpinerProps } from "./spinner.props";
import styles from "./styles.module.scss";

export const Spinner = ({
	appearence = "primary",
	size = "lg",
	className,
	...props
}: ISpinerProps) => {
	return (
		<div
			className={clsx(styles.loader, styles[appearence], styles[size], className)}
			{...props}
		></div>
	);
};
