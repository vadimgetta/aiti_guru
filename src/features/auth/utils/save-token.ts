export const saveToken = (rememberMe: boolean, token: string) => {
	const storage = rememberMe ? localStorage : sessionStorage;
	storage.setItem("accessToken", token);
};
