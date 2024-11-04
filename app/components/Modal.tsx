"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function Modal({ children, title }: { children: React.ReactNode; title?: string }) {
	const router = useRouter();

	const handleOpenChange = () => {
		router.back();
	};

	return (
		<Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
			<DialogContent className="max-w-[98vw] max-h-[98vh] lg:max-w-[90vw] p-0 border-none focus-visible:outline-0 !rounded-none overflow-hidden">
				<DialogHeader className="hidden">
					<DialogTitle>{title || ""}</DialogTitle>
				</DialogHeader>
				{/* <DialogContent className="overflow-y-hidden">{children}</DialogContent> */}
				{children}
			</DialogContent>
		</Dialog>
	);
}
