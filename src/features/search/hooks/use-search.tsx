import type { SubmitEvent } from "react";
import { useNavigate } from "react-router";

export const useSearch = () => {
	const navigate = useNavigate();

	const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget as HTMLFormElement);
		const search = formData.get("search")?.toString().trim() || "";

		const params = new URLSearchParams();

		if (search) {
			params.set("q", search);
		}

		navigate({ search: params.toString() });
	};

	return { handleSearch };
};
