import { Outlet } from "react-router";

export const AuthorizedLayout = () => {
	return (
		<main>
			<Outlet />
		</main>
	);
};
