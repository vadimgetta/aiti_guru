import clsx from "clsx";
import { createElement, type JSX } from "react";

import type { IHeadingProps } from "./heading.props";
import styles from "./styles.module.scss";

export const Heading = ({
	level,
	children,
	className,
	centred,
	...props
}: IHeadingProps) => {
	const Tag = `h${level}` as keyof JSX.IntrinsicElements;
	const heading = createElement(
		Tag,
		{
			className: clsx(styles.heading, styles[`h${level}`], className, {
				["centerText"]: centred
			}),
			...props
		},
		children
	);
	return heading;
};
