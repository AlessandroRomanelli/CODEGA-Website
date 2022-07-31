import React, {useContext} from "react";

import "./page.sass"
import "./Home.sass"

import {ReactComponent as BigLogo} from "../images/codega_logo.svg"
import {Parallax} from "react-scroll-parallax";

import {DarkContext} from "../App";
import Separator from "../components/Separator";
import ControlledCarousel from "../components/Carousel";
import Page from "../components/Page";


export default function Home(){
    const isDark = useContext(DarkContext)
    return <main>
        <Page className={"presentation"}>
            <div className={"background"}>
                <ControlledCarousel/>
                {/*<Parallax speed={-100}>*/}
                {/*    {isDark ? <img className={"kenburns-right"} src={Page1BGB} alt={"Audi GT3 racing at Montreal"}/> : <img className={"kenburns-right"} src={Page1BGW} alt={"Audi GT3 racing at Montreal"}/>}*/}

                {/*</Parallax>*/}
            </div>
            <div className={"container"}>
                <Parallax speed={-100}>
                    <div className={"splash slide-in-blurred-left"}>
                        <BigLogo className={"logo"}/>
                    </div>
                </Parallax>
            </div>
            <Separator idx={0} dark={isDark}/>
        </Page>
    </main>
}
