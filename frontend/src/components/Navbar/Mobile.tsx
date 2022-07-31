import {Link, NavLink} from "react-router-dom";
import { ReactComponent as LogoShort} from "../../images/codega_logo_abbr.svg";
import Hamburger from "hamburger-react";
import React, {useEffect, useRef, useState} from "react";
import {NavbarProps, SocialIcons} from "./Navbar";
import Switch from "react-switch";
import classNames from "classnames";



export default function MobileNavbar({ pages, isDark, setDark}: NavbarProps) {
    const [open, setOpen] = useState(false)
    const navbar = useRef<HTMLDivElement>(null)
    const menu = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node
            if (menu.current && navbar.current && !menu.current.contains(target as Node) && !navbar.current.contains(target) && open) {
                setOpen(false)
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside)
    }, [menu, open]);

    return <div ref={navbar} className={"mobile container"}>
        <div ref={menu} className={classNames("menu", { open })}>
            <hr/>
            <ul className={"links"}>
                {pages.map((x, i) => <li key={i}>
                    <NavLink to={x.href}>{x.name}</NavLink>
                </li>)}
            </ul>
            <hr/>
            <div className={"links socials"}>
                <SocialIcons/>
            </div>
            <hr/>
            <div className={"toggler"}>
                <Switch className={"dark-mode-toggle"} checked={isDark} onChange={() => setDark(wasDark => !wasDark)}/>
            </div>
        </div>
        <Link className={"logo-link"} to={"/"}><LogoShort width={175} className={"logo"}/></Link>
        <Hamburger size={32} toggle={setOpen} toggled={open}/>
    </div>
}
