import type { IInputProps } from "./input.props";
import styles from "./styles.module.scss";

export const Input = ({ children, ...props }: IInputProps) => {
	return (
		<input className={styles.input} {...props}>
			{children}
		</input>
	);
};
