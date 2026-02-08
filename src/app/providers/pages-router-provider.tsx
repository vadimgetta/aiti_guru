import { BrowserRouter, Route, Routes } from "react-router";

import { LoginPage } from "@/pages";
import { ProductsPage } from "@/pages/products";
import { PAGES_ROUTES } from "@/shared/config";

import { AuthorizedLayout } from "../layouts/authorized-layout/authorized-layout";
import { UnauthorizedLayout } from "../layouts/unauthorized-layout/unauthorized-layout";

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
			</Routes>
		</BrowserRouter>
	);
};
