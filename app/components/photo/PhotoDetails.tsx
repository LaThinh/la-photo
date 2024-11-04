"use client";

import { IPhoto } from "@lib/interface";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function PhotoDetails({ photoId }: { photoId: string }) {
	const [photo, setPhoto] = useState<IPhoto>();
	const [jsonData, setJsonData] = useState<IPhoto[]>([]);

	useEffect(() => {
		const storedData = localStorage.getItem("jsonPhotos");
		if (storedData) {
			setJsonData(JSON.parse(storedData));
		} else {
			//const defaultData = { name: 'John Doe', age: 30 };
			//setJsonData(defaultData);
		}
	}, []);

	useEffect(() => {
		const jsonPhoto = jsonData.filter((photo) => photo.id.toString() === photoId);
		if (jsonPhoto.length > 0) {
			setPhoto(jsonPhoto[0]);
		}
	}, [jsonData]);

	return (
		<div className="photo-detail">
			{photo && (
				<div className="photo-box flex gap-0 flex-col lg:flex-row">
					<div className="photo-image flex-1">
						<Image
							width={photo?.width || photo?.imageWidth || "700"}
							height={photo?.height || photo?.imageHeight || "700"}
							alt={photo?.alt || photo?.tags || "Photo Image"}
							src={photo?.src?.large2x || photo?.largeImageURL || "/default.png"}
							className="bg-slate-300 min-h-36 object-cover max-h-[90vh]"
						/>
					</div>

					<div className="photo-info w-full lg:w-1/3 lg:max-w-[380px] flex flex-col gap-2 p-2 lg:p-4">
						<h2 className="photo-title font-semibold font-Oswald text-lg lg:mt-8 lg:text-2xl xl:text-3xl capitalize">
							{photo?.alt || photo?.tags || "Photo Title"}
						</h2>
					</div>
				</div>
			)}
		</div>
	);
}
