import React from "react";

interface PageProps { className: string | undefined, children: React.ReactNode }
const Page: React.FC<PageProps> = ({ className, children }) => {
	return <section className={"page " + className}>
		{children}
	</section>
}

export default Page
