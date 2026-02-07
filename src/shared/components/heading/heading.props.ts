import type { HTMLAttributes, ReactNode } from "react";

export interface IHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
	level: 1 | 2;
	centred?: boolean;
}
