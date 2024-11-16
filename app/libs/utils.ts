import { EPhotoOrientation, IPhoto } from "./interface";

export function getOrientation(width: number, height: number): string {
	if (width > height) {
		return "landscape";
	} else if (height > width) {
		return "portrait";
	} else {
		return "square";
	}
}

export function getPhotoOrientation(photo: IPhoto): string {
	const width = photo?.width || photo?.imageWidth || 500;
	const height = photo?.height || photo?.imageHeight || 500;
	const ratio = width / height;

	let photoOrientation: EPhotoOrientation = EPhotoOrientation.Square;

	if (ratio > 1.2) {
		photoOrientation = EPhotoOrientation.Landscape;
	} else if (ratio < 0.8) {
		photoOrientation = EPhotoOrientation.Portrait;
	}

	return photoOrientation;
}

export function getRandomIndex(length: number): number {
	const maxLength = Math.min(length, 50);
	return Math.floor(Math.random() * maxLength);
}

export function extractDate(stringUrl: string) {
	const parts = stringUrl.split("/"); // Split the URL by "/"
	if (parts.length < 7) return null;
	return parts[6] + "/" + parts[5] + "/" + parts[4];
}
