import type { ReactNode } from "react";

export const UnauthorizedLayout = ({ children }: { children: ReactNode }) => {
	return <main>{children}</main>;
};
