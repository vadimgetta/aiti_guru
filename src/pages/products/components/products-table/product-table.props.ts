import type { IProductResponse } from "@/shared/model";

export interface IProductTableProps {
	data: IProductResponse;
	isLoading: boolean;
}
