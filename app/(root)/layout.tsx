export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<div className="layout-photo" suppressHydrationWarning>
			{children}
			{modal}
		</div>
	);
}
