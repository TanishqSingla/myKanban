import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
	children: React.ReactNode;
}

export default function (props: LayoutProps) {
	return (
		<>
			<Header />
			{props.children}
			<Footer />
		</>
	);
}
