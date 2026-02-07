import { CheckBox, Input } from "@/shared/components";

import styles from "./styles.module.scss";

export const LoginForm = () => {
	return (
		<form className={styles.form}>
			<div className={styles.inputs}>
				<div className={styles.field}>
					<label htmlFor="username">Логин</label>
					<Input
						type="text"
						id="username"
						appearance="primary"
						placeholder="Логин"
					/>
				</div>
				<div className={styles.field}>
					<label htmlFor="email">Почта</label>
					<Input
						type="email"
						id="email"
						appearance="primary"
						placeholder="Почта"
					/>
				</div>
				<div className={styles.field}>
					<label htmlFor="password">Пароль</label>
					<Input
						type="password"
						id="password"
						appearance="primary"
						placeholder="Логин"
					/>
				</div>
			</div>
			<div className={styles.remember}>
				<CheckBox />
				<span>Запомнить меня</span>
			</div>
		</form>
	);
};
