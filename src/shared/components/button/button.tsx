import type { IButtonProps } from "./button.props";
import styles from "./styles.module.scss";

export const Button = ({ children, ...props }: IButtonProps) => {
	return (
		<button className={styles.button} {...props}>
			{children}
		</button>
	);
};
