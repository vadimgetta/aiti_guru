import type { IContainerProps } from "./container.props";
import styles from "./styles.module.scss";

export const Container = ({ children, ...props }: IContainerProps) => {
	return (
		<div className={styles.container} {...props}>
			{children}
		</div>
	);
};
