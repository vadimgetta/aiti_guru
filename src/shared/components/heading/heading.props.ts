import type { HTMLAttributes, ReactNode } from "react";

export interface IHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
	level: 1 | 2 | 3 | 4 | 5 | 6;
	centred?: boolean;
}
