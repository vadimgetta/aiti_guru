import { AxiosError } from "axios";

import { instanceAxios } from "@/shared/api";
import { AUTH_ROUTE } from "@/shared/config";

import type { IAuthParams, IAuthResponse } from "../model";

export const handleAuth = async ({ username, password }: IAuthParams) => {
	try {
		const { data } = await instanceAxios.post<IAuthResponse>(`${AUTH_ROUTE}/login`, {
			username,
			password
		});
		return data;
	} catch (e: unknown) {
		let message = "Unknown error";

		if (e instanceof AxiosError) {
			message = (e.response?.data as { message?: string })?.message || e.message;
		} else if (e instanceof Error) {
			message = e.message;
		}

		console.error("Auth error:", message);

		throw new Error(message);
	}
};
