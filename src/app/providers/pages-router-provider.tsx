import { BrowserRouter, Route, Routes } from "react-router";

import { LoginPage, NotFoundPage, ProductsPage } from "@/pages";
import { PAGES_ROUTES } from "@/shared/config";

import { AuthorizedLayout, UnauthorizedLayout } from "../layouts";

export const PagesRouterProvider = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AuthorizedLayout />} path="/">
					<Route path={PAGES_ROUTES.PRODUCTS} element={<ProductsPage />} />
				</Route>
				<Route element={<UnauthorizedLayout />}>
					<Route path={PAGES_ROUTES.LOGIN} element={<LoginPage />} index />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
};
