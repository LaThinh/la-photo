export interface IPexelPhoto {
	id: number;
	width: number;
	height: number;
	url: string;
	photographer: string;
	photographer_url: string;
	photographer_id: number;
	avg_color: string;
	src: IPexelImage;
	liked: boolean;
	alt: string;
}

export interface IPixabayPhoto {
	id: number;
	imageWidth: number;
	imageHeight: number;
	largeImageURL: string;
	webformatURL: string;

	pageURL: string;
	type: string;
	tags: string;
	previewURL: string;
	previewWidth?: number;
	previewHeight?: number;
	webformatWidth: number;
	webformatHeight: number;
	imageSize: number;
	views: number;
	downloads: number;
	collections: number;
	likes: number;
	comments: number;
	user_id: number;
	user: string;
	userImageURL: string;
}

export interface IPhoto {
	id: number;
	width?: number;
	height?: number;
	imageWidth?: number;
	imageHeight?: number;
	src?: IPexelImage;
	largeImageURL?: string;
	webformatURL?: string;
	alt?: string;
	tags?: string;
	url?: string;
	pageURL?: string;

	liked?: boolean;
	likes?: number;
	avg_color?: string;
	comments?: number;

	photographer?: string;
	photographer_url?: string;
	photographer_id?: number;
	user_id?: number;
	user?: string;
	userImageURL: string;
}

export interface IPexelImage {
	landscape: string;
	large: string;
	large2x: string;
	medium: string;
	original: string;
	portrait: string;
	small: string;
	tiny: string;
}

export interface IPexelsResult {
	page: number;
	per_page: number;
	total_results: number;
	photos: IPhoto[];
	next_page?: string;
}

export interface IPixabayResult {
	total: number;
	totalHits: number;
	hits: IPhoto[];
}

export enum ImageSource {
	Pixabay = "pixabay",
	Pexels = "pexels",
	Unsplash = "unsplash",
}