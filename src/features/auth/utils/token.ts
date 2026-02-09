export const saveToken = (rememberMe: boolean, token: string) => {
	const storage = rememberMe ? localStorage : sessionStorage;
	storage.setItem("accessToken", token);
};

export const removeToken = () => {
	localStorage.removeItem("accessToken");
	sessionStorage.removeItem("accessToken");
};
