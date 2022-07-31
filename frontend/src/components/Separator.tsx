import React from "react";
import {ReactComponent as Separator1} from "../images/separators/separator-1.svg"

import "./Separator.sass"
import classNames from "classnames";

interface SeparatorProps {
    idx: number
    dark: boolean
}
export default function Separator({ idx, dark }: SeparatorProps) {
    const separators: React.FC[] = [Separator1]
    if (idx >= separators.length) throw new Error(`Invalid index provided to <Separator>, must be between 0 and ${separators.length-1}`)
    const Separator = separators[idx]
    return <div className={classNames("separator", { dark })}>
        <Separator/>
    </div>
}
