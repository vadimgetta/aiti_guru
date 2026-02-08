import { Spinner } from "../spinner/spinner";

import styles from "./styles.module.scss";

export const FallbackLoader = () => (
	<div className={styles.fallbackLoader}>
		<Spinner />
	</div>
);
