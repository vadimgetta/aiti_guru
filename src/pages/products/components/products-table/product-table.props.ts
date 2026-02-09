import type { InfiniteData } from "@tanstack/react-query";

import type { IProductResponse } from "@/shared/model";

export interface IProductTableProps {
	data: InfiniteData<IProductResponse>;
	isLoading: boolean;
}
