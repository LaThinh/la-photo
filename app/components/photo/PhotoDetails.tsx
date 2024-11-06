"use client";

import { IPhoto } from "@/app/libs/interface";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LuDownloadCloud } from "react-icons/lu";
import PhotoTags from "./PhotoTags";
import { FaCameraRetro } from "react-icons/fa";

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
		<div className="photo-detail ">
			{photo && (
				<div className="photo-box flex gap-0 flex-col lg:flex-row">
					<div className="photo-image flex-1 flex justify-center min-h-[50vh] bg-slate-900">
						<Image
							width={photo?.width || photo?.imageWidth || "700"}
							height={photo?.height || photo?.imageHeight || "700"}
							alt={photo?.alt || photo?.tags || "Photo Image"}
							src={photo?.src?.large2x || photo?.largeImageURL || "/default.png"}
							className="bg-slate-300 min-h-36 object-cover h-full w-auto max-h-[98vh]"
						/>
					</div>

					<div className="photo-info w-full lg:w-1/3 lg:max-w-[540px] flex flex-col gap-5 p-3 lg:p-5">
						<h2 className="photo-title font-semibold font-Oswald text-xl lg:mt-8 lg:text-2xl xl:text-3xl capitalize">
							{photo?.alt || photo?.tags || "Photo Title"}
						</h2>
						<div className="photo-container flex-1 flex flex-col gap-3">
							<div className="photographer flex items-center gap-2">
								<div className="avatar w-12 h-12 flex items-center justify-center aspect-square rounded-full">
									{photo?.userImageURL ? (
										<Image
											src={photo?.userImageURL}
											alt={photo?.user || "User Photo"}
											width="96"
											height="96"
											className="object-cover rounded-full"
										/>
									) : (
										<FaCameraRetro className="w-8 h-8" />
									)}
								</div>
								<div className="name">
									<span className="text-lg">
										{photo?.photographer || photo?.user}
									</span>
								</div>
							</div>

							{/* {photo?.tags} */}
							{photo?.tags && <PhotoTags tags={photo?.tags} />}
						</div>

						<div className="photo-download flex justify-center">
							<Button asChild>
								<Link
									className="download bg-green-700 !rounded-full !h-12 px-8"
									target="_blank"
									title="Download Image"
									href={photo?.largeImageURL || photo.src?.original || "/"}
								>
									<LuDownloadCloud />
									<span>Download</span>
								</Link>
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
