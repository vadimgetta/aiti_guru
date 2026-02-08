import { queryOptions } from "@tanstack/react-query";

import { instanceAxios } from "@/shared/api";
import { AUTH_ROUTE, QUERY_KEYS } from "@/shared/config";

import type { IUser } from "../model";

const getMe = async () => {
	try {
		const { data } = await instanceAxios.get<IUser>(`${AUTH_ROUTE}/me`);
		return data;
	} catch (e) {
		console.error(e);
	}
};

export const getMeOptions = queryOptions({
	queryKey: [QUERY_KEYS.ME],
	queryFn: getMe,
	retry: false
});
