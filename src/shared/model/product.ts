import type {
	Dimensions,
	ICollectionGeneral,
	Meta,
	Review
} from "./collection-interface";

export interface IProductFull {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	tags: string[];
	brand?: string;
	sku: string;
	weight: number;
	dimensions: Dimensions;
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: string;
	reviews: Review[];
	returnPolicy: string;
	minimumOrderQuantity: number;
	meta: Meta;
	images: string[];
	thumbnail: string;
}

export interface IProduct {
	id: number;
	title: string;
	category: string;
	brand?: string;
	price: number;
	sku: string;
	rating: number;
	stock: number;
	thumbnail: string;
}

export interface IProductResponse extends ICollectionGeneral {
	products: IProduct[];
}
