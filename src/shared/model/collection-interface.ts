export interface ICollectionGeneral {
	total: number;
	skip: number;
	limit: number;
}

export interface Dimensions {
	width: number;
	height: number;
	depth: number;
}

export interface Review {
	rating: number;
	comment: string;
	date: string;
	reviewerName: string;
	reviewerEmail: string;
}

export interface Meta {
	createdAt: string;
	updatedAt: string;
	barcode: string;
	qrCode: string;
}
