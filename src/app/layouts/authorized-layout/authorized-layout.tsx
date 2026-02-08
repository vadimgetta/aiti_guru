import { Outlet } from "react-router";

import { ProtectedRoutes } from "@/features";

export const AuthorizedLayout = () => {
	return (
		<ProtectedRoutes>
			<main>
				<Outlet />
			</main>
		</ProtectedRoutes>
	);
};
