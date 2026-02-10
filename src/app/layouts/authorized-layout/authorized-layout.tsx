import { Outlet, useLocation } from "react-router";

import { Search } from "@/features";
import { Container, Heading } from "@/shared/components";
import { PAGES_ROUTES } from "@/shared/config";
import { LangIcon, MailIcon, NotifyIcon, SettingsIcon } from "@/shared/icons";

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
						<div className={styles.search}>
							<Search />
						</div>
						<div className={styles.info}>
							<LangIcon />
							<NotifyIcon />
							<MailIcon />
							<SettingsIcon />
						</div>
					</div>
				</Container>
			</header>
			<main className={styles.main}>
				<Outlet />
			</main>
		</>
	);
};
