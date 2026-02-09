import type { ReactElement } from "react";

type InputElement = ReactElement<React.InputHTMLAttributes<HTMLInputElement>, "input">;

export interface IInputLabelProps {
	children: InputElement;
	title?: string;
	idForLabel: string;
	disabled?: boolean;
	error?: string;
}
