import { lazy, type ComponentType, Suspense } from "react";

import { FallbackLoader } from "@/shared/components";

const withLazy = (importer: () => Promise<{ default: ComponentType }>) => {
	const LazyComponent = lazy(importer);

	return function LazyWrapper() {
		return (
			<Suspense fallback={<FallbackLoader />}>
				<LazyComponent />
			</Suspense>
		);
	};
};

const LoginPage = withLazy(() =>
	import("./login/login-page").then((module) => ({
		default: module.LoginPage
	}))
);
const ProductsPage = withLazy(() =>
	import("./products/products-page").then((module) => ({
		default: module.ProductsPage
	}))
);
const NotFoundPage = withLazy(() =>
	import("./not-found-page/not-found-page").then((module) => ({
		default: module.NotFoundPage
	}))
);

export { LoginPage, ProductsPage, NotFoundPage };
