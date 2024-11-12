"use client";

import { useFavoriteStore } from "@/app/stores/favoriteStore";
import { IPhoto } from "@libs/interface";
import React, { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

export default function PhotoFavorite({ photo }: { photo: IPhoto }) {
	const { favoriteImages, addFavorite, removeFavorite } = useFavoriteStore();
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		if (!favoriteImages) return;
		const index = favoriteImages.findIndex((image: IPhoto) => image.id === photo.id);
		if (index >= 0) setIsFavorite(true);
	}, [favoriteImages]);

	const toggleFavorite = () => {
		if (isFavorite) {
			removeFavorite(photo);
		} else {
			addFavorite(photo);
		}
		setIsFavorite(!isFavorite);
	};

	return (
		<div className="photo-favious absolute right-2 top-2">
			<button
				onClick={toggleFavorite}
				className="w-10 h-10 flex justify-center items-center p-1 rounded-full bg-white/20"
			>
				{/* {isFavorite ? "❤️" : "🤍"} */}
				{isFavorite ? (
					<IoHeart className="w-7 h-7 text-red-600" />
				) : (
					<IoHeartOutline className="w-7 h-7 text-gray-600" />
				)}
			</button>
		</div>
	);
}
