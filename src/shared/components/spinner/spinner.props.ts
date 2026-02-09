import type { HTMLAttributes } from "react";

export interface ISpinerProps extends HTMLAttributes<HTMLDivElement> {
	appearence?: "primary" | "secondary";
	size?: "sm" | "lg";
}
