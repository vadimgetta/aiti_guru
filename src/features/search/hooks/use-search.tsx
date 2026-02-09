import type { SubmitEvent } from "react";
import { useNavigate, useLocation } from "react-router";

export const useSearch = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		const search = formData.get("search")?.toString() || "";
		const params = new URLSearchParams(location.search);
		if (search) {
			params.set("q", search);
		} else {
			params.delete("q");
		}
		navigate({ search: params.toString() });
	};

	return { handleSearch };
};
