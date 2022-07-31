import {Link, NavLink} from "react-router-dom";
import {ReactComponent as LogoShort} from "../../images/codega_logo_abbr.svg";
import Switch from "react-switch";
import React from "react";
import {NavbarProps, SocialIcons} from "./Navbar";
import ItalianTricolor from "../../images/Flag_of_Italy.svg";

export default function DesktopNavbar({ pages, isDark, setDark}: NavbarProps) {
    return <div className={"desktop container"}>
        <Link className={"logo-link"} to={"/"}>
            <div className={"tricolor"}><img src={ItalianTricolor}/></div>
            <LogoShort width={175} className={"logo"}/>
        </Link>
        <div className={"links"}>
            {pages.map((x, i) => <NavLink key={i} to={x.href}>{x.name}</NavLink>)}
            <Switch className={"dark-mode-toggle"} checked={isDark} onChange={() => setDark(wasDark => !wasDark)}/>
            <SocialIcons/>
        </div>
    </div>
}
