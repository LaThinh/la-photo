"use client";

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			// entry.target.classList.toggle("show", entry.isIntersecting);
			// entry.target.classList.toggle("animated-fadeInUp", !entry.isIntersecting);
			// if (entry.isIntersecting) observer.unobserve(entry.target);
			// entry.target.classList.add("animation");
			if (entry.isIntersecting) {
				entry.target.classList.add("fadeInUp");
				return;
			}
		});
	},
	{
		// threshold: 0.5,
		rootMargin: "100px 0px -100px 0px",
	}
);

export default function AnimationScript() {
	if (typeof window !== "undefined") {
		setTimeout(() => {
			const cards = document.querySelectorAll(".animation");
			cards.forEach((card) => {
				observer.observe(card);
			});
		}, 1000);
	}
	return null;
}
