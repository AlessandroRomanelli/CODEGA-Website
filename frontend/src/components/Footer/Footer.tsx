import React, {Dispatch, SetStateAction} from "react";
import "./Footer.sass"
import CodegaLogo from "../../images/codega_logo.svg"
import {SocialIcons} from "../Navbar/Navbar";
import {Page} from "../../App";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocation} from "@fortawesome/free-solid-svg-icons/faLocation";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons/faLocationDot";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import {faEnvelopeOpen} from "@fortawesome/free-solid-svg-icons/faEnvelopeOpen";

export interface FooterProps {
	pages: Page[]
}
export default function Footer({ pages }: FooterProps) {
	return <footer>
		<div className={"container footer"}>
			<div>
				<img alt="" src={CodegaLogo}/>
				<div>Aliquam porta consequat aliquet. Sed lobortis bibendum sem, vel sodales elit accumsan in. Quisque id blandit ex. Proin dictum sit amet elit vitae rhoncus. Ut mattis luctus lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</div>
				<div className={"social-icons"}><SocialIcons/></div>
			</div>
			<div className={"navigation"}>
				<h2>Explore</h2>
				<ul>
					{pages.map((x, i) => <li><NavLink to={x.href}>{x.name}</NavLink></li>)}
				</ul>
			</div>
			<div>
				<h2>Sponsors</h2>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi facilisis velit a auctor tempus. Vestibulum molestie enim a nibh hendrerit, vitae laoreet libero blandit.
			</div>
			<div className={"contacts"}>
				<h2>Contacts</h2>
				<div>
					<div>
						<FontAwesomeIcon icon={faLocationDot}/> Via Spluga 56/B, 23854 Olginate LC, Italy
					</div>
					<div>
						<FontAwesomeIcon icon={faPhone}/>+351 (632) 894-0827
					</div>
					<div>
						<FontAwesomeIcon icon={faEnvelopeOpen}/>info@codegateam.com
					</div>
				</div>

			</div>
		</div>
		<div className={"copyright"}><small>Ⓒ Alessandro Romanelli {new Date().getFullYear()}</small></div>
	</footer>
}
