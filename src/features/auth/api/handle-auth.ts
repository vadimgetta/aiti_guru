import { mutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { instanceAxios } from "@/shared/api";
import { AUTH_ROUTE } from "@/shared/config";

import type { IAuth, IAuthResponse } from "../model";

const handleAuth = async ({ username, password }: IAuth) => {
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

export const handleAuthOptions = (
	username: string,
	password: string,
	onSuccess?: (data: IAuthResponse | undefined) => void,
	onError?: (error: unknown) => void
) => {
	return mutationOptions({
		mutationFn: () => handleAuth({ username, password }),
		onSuccess: (data) => {
			onSuccess?.(data);
		},
		onError: (e) => {
			onError?.(e);
		}
	});
};
