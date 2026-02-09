import clsx from "clsx";
import { createPortal } from "react-dom";

import { CloseIcon } from "@/shared/icons";

import type { IModalProps } from "./modal.props";
import styles from "./styles.module.scss";

export const Modal = ({
	children,
	isOpen,
	onClose,
	className,

	...props
}: IModalProps) => {
	const modalRoot = document.getElementById("modal");
	if (!modalRoot) {
		return null;
	}

	return createPortal(
		<div
			className={clsx(styles.overlay, {
				[styles.open]: isOpen,
				[styles.hidden]: !isOpen
			})}
			{...props}
		>
			<div className={clsx(styles.content, className)} {...props}>
				{onClose && (
					<div className={styles.header}>
						<button onClick={onClose} className={styles.close}>
							<CloseIcon width={16} height={16} />
						</button>
					</div>
				)}
				{children}
			</div>
		</div>,
		modalRoot
	);
};
