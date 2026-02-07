import { Outlet } from "react-router";

export const UnauthorizedLayout = () => {
	return (
		<main>
			<Outlet />
		</main>
	);
};
