export async function POST(request: Request) {
	const { query } = await request.json();
	console.log("Pixabay search query = " + query);
	const searchUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${query}&image_type=photo&per_page=100&min_width=200&min_height=200`;
	const response = await fetch(searchUrl, { next: { revalidate: 3600 } }).then((res) =>
		res.json()
	);

	// console.log(response);

	return Response.json(response);
}
