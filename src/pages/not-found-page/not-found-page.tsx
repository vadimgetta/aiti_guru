import { NavLink } from "react-router";

import { Heading } from "@/shared/components";
import { PAGES_ROUTES } from "@/shared/config";

import styles from "./styles.module.scss";

export const NotFoundPage = () => {
	return (
		<div className={styles.notFound}>
			<Heading level={1}>404</Heading>
			<p>Страница не найдена</p>
			<NavLink to={PAGES_ROUTES.PRODUCTS}>На главную</NavLink>
		</div>
	);
};
