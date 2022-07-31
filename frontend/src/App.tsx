import React, {createContext, ReactNode, useEffect, useState} from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Pages from "./pages"
import {ParallaxProvider} from "react-scroll-parallax";

import "./animista.css"
import "./App.sass"
import Footer from "./components/Footer/Footer";

export interface Page {
	href: string,
	name: string,
	component: ReactNode | null
}

const darkInitialState = (localStorage.getItem("isDark") || "true") === "true"
export const DarkContext = createContext(darkInitialState)

function App() {
	const [isDark, setDark] = useState<boolean>(darkInitialState)

    useEffect(() => {
		console.log("Switching")
        localStorage.setItem("isDark", `${isDark}`)
    }, [isDark])

	const pages: Page[] = [
		{href: '/', name: 'Home', component: <Pages.Home/>},
		{href: '/about', name: 'About Us', component: <Pages.About/>},
		{href: '/team', name: 'Team', component: <Pages.Team/>},
		{href: '/history', name: 'History', component: <Pages.History/>},
		{href: '/cup', name: 'GT3 Cup', component: <Pages.Cup/>},
		{href: '/contacts', name: 'Contacts', component: <Pages.Contact/>}
	]
	return (
		<ParallaxProvider>
			<Router>
				<DarkContext.Provider value={isDark}>
					<div className={isDark ? "dark" : undefined}>
						<Navbar pages={pages} isDark={isDark} setDark={setDark}/>
						<Routes>
							{
								pages.map((x, i) => <Route key={i} path={x.href} element={x.component}/>)
							}
						</Routes>
						<Footer pages={pages}/>
					</div>
				</DarkContext.Provider>
			</Router>
		</ParallaxProvider>
	);
}

export default App;
