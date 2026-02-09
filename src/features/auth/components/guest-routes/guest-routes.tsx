import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

import { getMeOptions } from "@/features/auth/api/get-me";
import { FallbackLoader } from "@/shared/components";
import { PAGES_ROUTES } from "@/shared/config";

export const GuestRoutes = ({ children }: { children: ReactNode }) => {
	const { data: user, isLoading } = useQuery(getMeOptions);

	if (isLoading) {
		return <FallbackLoader />;
	}
	return user ? <Navigate to={PAGES_ROUTES.PRODUCTS} replace /> : <>{children}</>;
};
