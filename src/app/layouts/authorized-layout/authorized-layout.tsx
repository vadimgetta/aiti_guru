import type { ReactNode } from "react";

export const AuthorizedLayout = ({ children }: { children: ReactNode }) => {
	return <main>{children}</main>;
};
