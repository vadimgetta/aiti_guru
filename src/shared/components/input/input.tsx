import clsx from "clsx";

import type { IInputProps } from "./input.props";
import styles from "./styles.module.scss";

export const Input = ({ children, className, appearance, ...props }: IInputProps) => {
	return (
		<input
			className={clsx(className, styles.input, {
				[styles.primary]: appearance === "primary",
				[styles.secondary]: appearance === "secondary"
			})}
			{...props}
		>
			{children}
		</input>
	);
};
