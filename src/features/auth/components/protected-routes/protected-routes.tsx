import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

import { PAGES_ROUTES } from "@/shared/config";

import { getMeOptions } from "../../api/get-me";

export const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
	const { data: user, isLoading } = useQuery(getMeOptions);
	if (isLoading) {
		return <div>Loading</div>;
	}
	return user ? children : <Navigate to={PAGES_ROUTES.LOGIN} replace />;
};
