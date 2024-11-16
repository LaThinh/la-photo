export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<div className="layout-photo" suppressHydrationWarning>
			<div className="main-wrapper mx-auto w-full max-w-[2400px]">{children}</div>
			{modal}
		</div>
	);
}
