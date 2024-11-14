import { IPhoto } from "@/app/libs/interface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoriteState {
	favoriteImages: IPhoto[];
	addFavorite: (by: IPhoto) => void;
	removeFavorite: (by: IPhoto) => void;
}

const getLocalStorage = () => {
	if (typeof window !== "undefined")
		return JSON.parse(localStorage.getItem("favoritePhotos") || "[]");
	return [];
};

export const useFavoriteStore = create<FavoriteState>()(
	persist(
		(set) => {
			const initialFavoriteImages = getLocalStorage();

			return {
				favoriteImages: initialFavoriteImages,
				addFavorite: (image: IPhoto) => {
					set((state) => ({
						favoriteImages: [...state.favoriteImages, image],
					}));
					//sessionStorage.setItem('favoritePhotos', JSON.stringify([...state.favoriteImages, image]));
				},
				removeFavorite: (image: IPhoto) => {
					set((state) => ({
						favoriteImages: state.favoriteImages.filter((img) => img.id !== image.id),
					}));
					// localStorage.setItem('favoritePhotos', JSON.stringify(favoriteImages.filter((img) => img !== image)));
				},
			};
		},
		{
			name: "favoritePhotos",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
