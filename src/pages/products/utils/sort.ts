export type SortOrder = "asc" | "desc";

export interface SortParams {
	sortBy?: string;
	order?: SortOrder;
}

export const updateSortSearchParams = (
	currentParams: URLSearchParams,
	columnId: string
): URLSearchParams => {
	const params = new URLSearchParams(currentParams);

	const currentSortBy = params.get("sortBy");
	const currentOrder = params.get("order") as SortOrder | null;

	if (currentSortBy === columnId) {
		if (currentOrder === "asc") {
			params.set("order", "desc");
		} else if (currentOrder === "desc") {
			params.delete("sortBy");
			params.delete("order");
		} else {
			params.set("order", "asc");
		}
	} else {
		params.set("sortBy", columnId);
		params.set("order", "asc");
	}

	return params;
};
