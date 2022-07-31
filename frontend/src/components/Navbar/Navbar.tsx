import React, {Dispatch, SetStateAction} from "react";
import "./Navbar.sass"
import {Page} from "../../App";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

import DesktopNavbar from "./Desktop";
import MobileNavbar from "./Mobile";

export const SocialIcons = () => {
    const socials = [
        { name: "Instagram", abbr: "IG", icon: <FontAwesomeIcon icon={faInstagram}/>, link: "https://www.instagram.com/codega_squadra_corse/" },
        { name: "Facebook", abbr: "FB", icon: <FontAwesomeIcon icon={faFacebookSquare}/>, link: "https://www.facebook.com/codegasquadracorse/" },
    ]
    return <>
        {
            socials.map(x => <a key={x.name} className={"social"} target={"_blank"} href={x.link} data-abbr={x.abbr} rel="noreferrer" >{x.icon}</a>)
        }
    </>
}

export interface NavbarProps {
    pages: Page[],
    isDark: boolean,
    setDark: Dispatch<SetStateAction<boolean>>
}

export default function Navbar({ pages, isDark, setDark }: NavbarProps) {
    return <nav className={"my-navbar"}>
        <DesktopNavbar pages={pages} isDark={isDark} setDark={setDark}/>
        <MobileNavbar pages={pages} isDark={isDark} setDark={setDark}/>
    </nav>
}
