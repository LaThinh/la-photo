"use client";

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			// entry.target.classList.toggle("show", entry.isIntersecting);
			// entry.target.classList.toggle("animated-fadeInUp", !entry.isIntersecting);
			// if (entry.isIntersecting) observer.unobserve(entry.target);
			// entry.target.classList.add("animation");
			if (entry.isIntersecting) {
				const classAttr = entry.target.getAttribute("data-animate") || "";
				// const classList = classAttr.split(" ");
				entry.target.classList.add(
					// "animate-fade-up",
					// "animate-delay-300",
					// "animate-duration-1000"

					classAttr
				);

				return;
			}
		});
	},
	{
		// threshold: 0.5,
		// rootMargin: "100px -500px -100px 0px",
		threshold: 0,
		rootMargin: "-20px",
	}
);

export default function AnimationScript() {
	if (typeof window !== "undefined") {
		setTimeout(() => {
			// const cards = document.querySelectorAll(".animation");
			const cards = document.querySelectorAll("[data-animate]");
			cards.forEach((card) => {
				observer.observe(card);
				card.classList.add("opacity-0");
			});
		}, 1000);
	}
	return null;
}
