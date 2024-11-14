"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function Modal({ children, title }: { children: React.ReactNode; title?: string }) {
	const router = useRouter();

	const handleOpenChange = () => {
		router.back();
	};

	return (
		<Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
			<DialogContent className="modal-photo max-w-[98vw] max-h-[98vh] xl:w-[96vw] 2xl:max-w-[1820px] p-0 border-none focus-visible:outline-0 !rounded-none overflow-hidden">
				<DialogHeader className="hidden">
					<DialogTitle>{title || ""}</DialogTitle>
				</DialogHeader>
				<DialogDescription className="hidden"></DialogDescription>
				{/* <DialogContent className="overflow-y-hidden">{children}</DialogContent> */}
				{children}
			</DialogContent>
		</Dialog>
	);
}
