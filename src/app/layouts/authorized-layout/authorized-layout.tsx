import { Outlet, useLocation } from "react-router";

import { Search } from "@/features";
import { Container, Heading } from "@/shared/components";
import { PAGES_ROUTES } from "@/shared/config";

import styles from "./styles.module.scss";

export const AuthorizedLayout = () => {
	const location = useLocation();

	const title = (pathname: string) => {
		switch (pathname) {
			case PAGES_ROUTES.PRODUCTS:
				return "Товары";
			default:
				return "";
		}
	};
	return (
		<>
			<header className={styles.header}>
				<Container>
					<div className={styles.inner}>
						<Heading className={styles.title} level={2}>
							{title(location.pathname)}
						</Heading>
						<Search />
					</div>
				</Container>
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
};
