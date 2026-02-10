import clsx from "clsx";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import type { INotificationProps } from "./notification.props";
import styles from "./styles.module.scss";

export const Notification = ({
	message,
	type = "info",
	onClose,
	isOpen
}: INotificationProps) => {
	useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(() => {
				onClose();
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	const portalRoot = document.getElementById("notification");
	if (!portalRoot) {
		return null;
	}

	return createPortal(
		<div className={styles.wrapper}>
			<div className={clsx(styles.notification, styles[type])}>
				<span>{message}</span>
				<button className={styles.close} onClick={onClose}>
					×
				</button>
			</div>
		</div>,
		portalRoot
	);
};
