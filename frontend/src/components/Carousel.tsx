import React, {useContext, useEffect, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';

import Dark1 from "../images/main-dark-1.png"
import Dark2 from "../images/main-dark-2.png"
import Dark3 from "../images/main-dark-6.png"
import Dark4 from "../images/main-dark-4.png"
import Dark5 from "../images/main-dark-8.png"

import Light1 from "../images/main-light-1.png"
import Light2 from "../images/main-light-2.png"
import Light3 from "../images/main-light-3.png"
import Light4 from "../images/main-light-4.png"
import Light5 from "../images/main-light-5.png"

import {DarkContext} from "../App";
import 'bootstrap/dist/css/bootstrap.min.css';


function shuffle<T>(array: T[]): T[] {
    return array.sort(() => 0.5 - Math.random());
}

export default function ControlledCarousel() {
    const isDark = useContext(DarkContext)
    const interval = 7500

    const imagesDark = shuffle([
        {
            path: Dark1,
            effect: "kenburns-right"
        },{
            path: Dark2,
            effect: "kenburns-bottom-right"
        },{
            path: Dark3,
            effect: "kenburns-bottom-left"
        },{
            path: Dark4,
            effect: "kenburns-bottom-left"
        },{
            path: Dark5,
            effect: "kenburns-right"
        }
    ])
    const imagesLight = shuffle([
        {
            path: Light1,
            effect: "kenburns-right"
        },{
            path: Light2,
            effect: "kenburns-bottom-right"
        },{
            path: Light3,
            effect: "kenburns-bottom-left"
        },{
            path: Light4,
            effect: "kenburns-bottom"
        },{
            path: Light5,
            effect: "kenburns-left"
        }
    ])
    const images = isDark ? imagesDark : imagesLight

    return (
        <Carousel fade controls={false} indicators={false} interval={interval}>
            {
                images.map((x, i) => <Carousel.Item key={i}>
                    <img
                        className={`d-block w-100 ${x.effect || ""}`}
                        src={x.path}
                        alt="Carousel slider"
                    />
                </Carousel.Item>)
            }
        </Carousel>
    );
}

