"use client";
import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi";

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

function scrollToTop() {
	if (!isBrowser()) return;
	window.scrollTo({ top: 0, behavior: "smooth" });
}

export function ScrollToTop() {
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowButton(window.scrollY > 2000);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className={`fixed transition-all z-[200] right-5 p-1 w-12 h-12 cursor-pointer
            flex justify-center items-center text-white rounded-full 
            bg-green-600/80 hover:bg-green-600 text-lg ${
				showButton ? " bottom-12" : " -bottom-20"
			}`}
			title="Scroll to top"
			onClick={scrollToTop}
		>
			<HiArrowUp className="w-6 h-6" />
		</div>
	);
}

export default ScrollToTop;
