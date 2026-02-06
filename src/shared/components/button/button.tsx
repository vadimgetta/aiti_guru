import clsx from "clsx";
import { cloneElement, isValidElement } from "react";

import type { IButtonProps } from "./button.props";
import styles from "./styles.module.scss";
export const Button = ({ children, className, asChild, ...props }: IButtonProps) => {
	const classes = clsx(styles.button, className);
	if (asChild && isValidElement(children)) {
		return cloneElement(children as React.JSX.Element, {
			className: classes,
			...props
		});
	}
	return (
		<button className={classes} {...props}>
			{children}
		</button>
	);
};
