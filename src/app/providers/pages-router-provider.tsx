import { BrowserRouter, Route, Routes } from "react-router";

import { LoginPage } from "@/pages";
import { ROUTES } from "@/shared/config";

import { UnauthorizedLayout } from "../layouts/unauthorized-layout/unauthorized-layout";

export const PagesRouterProvider = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<UnauthorizedLayout />}>
					<Route path={ROUTES.LOGIN} element={<LoginPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
