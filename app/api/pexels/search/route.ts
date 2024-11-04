// export const dynamic = "force-static";

import { createClient } from "pexels";

export async function POST(request: Request) {
	const { query } = await request.json();
	console.log("Pexels search query = " + query);
	const client = createClient(process.env.PEXELS_API_KEY || "");
	const response = await client.photos.search({ query, per_page: 100 });

	return Response.json(response);
}
