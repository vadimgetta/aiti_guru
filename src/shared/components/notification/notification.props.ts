type NotificationType = "success" | "error" | "info";

export interface INotificationProps {
	message: string;
	type?: NotificationType;
	onClose: () => void;
	isOpen: boolean;
}
