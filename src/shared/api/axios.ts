import axios from "axios";

import { API } from "../config";

export const instanceAxios = axios.create({
	baseURL: API,
	// withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
});

instanceAxios.interceptors.request.use((config) => {
	const accessToken =
		localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
	console.log(accessToken);
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

instanceAxios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._isRetry) {
			originalRequest._isRetry = true;

			try {
				const response = await axios.post(
					`${API}/auth/refresh`,
					{},
					{ withCredentials: true }
				);

				const newAccessToken = response.data.accessToken;
				const storage = localStorage.getItem("accessToken")
					? localStorage
					: sessionStorage;
				storage.setItem("accessToken", newAccessToken);

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

				return instanceAxios(originalRequest);
			} catch (e) {
				console.error(e);
			}
		}

		return Promise.reject(error);
	}
);
