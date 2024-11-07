import PhotoDetails from "@components/photo/PhotoDetails";
import React from "react";

export default async function PhotoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const photoId = (await params).slug;

	// const client = createClient(process.env.PEXELS_API_KEY || "");

	// const resPhoto = await client.photos.show({ id: 2014422 }); //.then(photo => {photo});
	// console.log(resPhoto);

	return (
		<div className="photo-page">
			<div className="container max-w-screen-xl">
				<PhotoDetails photoId={photoId} />
			</div>
		</div>
	);
}
