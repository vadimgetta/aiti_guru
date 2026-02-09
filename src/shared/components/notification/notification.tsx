import clsx from "clsx";
import { createPortal } from "react-dom";

import type { INotificationProps } from "./notification.props";
import styles from "./styles.module.scss";

export const Notification = ({
	message,
	type = "info",
	onClose,
	isOpen
}: INotificationProps) => {
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
