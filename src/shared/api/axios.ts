import axios from "axios";

export const instanceAxios = axios.create({
	baseURL: "base-url",
	headers: {
		"Content-Type": "application/json"
	},
	withCredentials: true
});

instanceAxios.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response &&
			error.response.status === 401 &&
			originalRequest &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true;

			try {
				await axios.post(``, {}, { withCredentials: true });

				return instanceAxios.request(originalRequest);
			} catch (e) {
				if (e instanceof Error) {
					console.error(e.message);
				}
			}
		}

		throw error;
	}
);
