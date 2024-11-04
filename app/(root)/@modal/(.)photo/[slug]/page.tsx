import Modal from "@components/Modal";
import PhotoDetails from "@components/photo/PhotoDetails";
// import { createClient } from "pexels";
import React from "react";

export default async function PhotoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const photoId = (await params).slug;

	// const client = createClient(process.env.PEXELS_API_KEY || "");

	// const resPhoto = await client.photos.show({ id: 2014422 }); //.then(photo => {photo});
	// console.log(resPhoto);

	return (
		<Modal>
			<PhotoDetails photoId={photoId} />
		</Modal>
	);
}
