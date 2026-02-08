import type { InputHTMLAttributes } from "react";

export interface ICheckBoxProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"type"
> {}
