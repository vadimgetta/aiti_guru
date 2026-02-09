import type { HTMLAttributes, ReactNode } from "react";

export interface IModalProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	isOpen: boolean;
	onClose?: () => void;
}
