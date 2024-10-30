import { createClient } from "pexels";

export async function GET() {
	console.log("Pexels search curated");
	const client = createClient(process.env.PEXELS_API_KEY || "");
	const response = await client.photos.curated({ per_page: 72, page: 2 });

	return Response.json(response);
}
