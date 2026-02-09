import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { GuestRoutes, ProtectedRoutes } from "@/features";
import { LoginPage, NotFoundPage, ProductsPage } from "@/pages";
import { PAGES_ROUTES } from "@/shared/config";

import { AuthorizedLayout, UnauthorizedLayout } from "../layouts";

export const PagesRouterProvider = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={
						<ProtectedRoutes>
							<AuthorizedLayout />
						</ProtectedRoutes>
					}
					path="/"
				>
					<Route
						index
						element={<Navigate to={PAGES_ROUTES.PRODUCTS} replace />}
					/>
					<Route path={PAGES_ROUTES.PRODUCTS} element={<ProductsPage />} />
				</Route>
				<Route
					element={
						<GuestRoutes>
							<UnauthorizedLayout />
						</GuestRoutes>
					}
				>
					<Route path={PAGES_ROUTES.LOGIN} element={<LoginPage />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
};
