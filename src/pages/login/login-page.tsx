import { NavLink } from "react-router";

import { LoginForm } from "@/features";
import { Heading } from "@/shared/components";
import { ROUTES } from "@/shared/config";
import { LogoIcon } from "@/shared/icons";

import styles from "./styles.module.scss";

export const LoginPage = () => {
	return (
		<div className={styles.main}>
			<div className={styles.wrapper}>
				<div className={styles.inner}>
					<div className={styles.top}>
						<LogoIcon className={styles.logo} />
						<Heading className={styles.title} level={1}>
							Добро пожаловать!
						</Heading>
						<p className={styles.subtile}>Пожалуйста, авторизируйтесь</p>
					</div>
					<LoginForm />
					<div className={styles.bottom}>
						<div className={styles.divider}>
							<span>или</span>
						</div>
						<div className={styles.footer}>
							Нет аккаунта? <NavLink to={ROUTES.LOGIN}>Создать</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
