import type { IInputLabelProps } from "./input-label.props";
import styles from "./styles.module.scss";

export const InputLabel = ({
	children,
	error,
	idForLabel,
	title,
	disabled
}: IInputLabelProps) => {
	return (
		<fieldset disabled={disabled} className={styles.field}>
			<label htmlFor={idForLabel}>{title}</label>
			{children}
			{error && <div className={styles.error}>{error}</div>}
		</fieldset>
	);
};
