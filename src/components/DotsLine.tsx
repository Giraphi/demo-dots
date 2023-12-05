import React, { useEffect, useState } from "react";
import Dot from "./Dot";
import { MotionValue } from "framer-motion";
import { MousePosition } from "./DotsRowLarge";

export interface DotsLineProps {
    numDots: number;
    hide?: "rightHalf" | "leftHalf";
    mousePosition?: MotionValue<MousePosition | undefined>;
}

export default function DotsLine(props: DotsLineProps) {
    const [hideStart, setHideStart] = useState<number>(-1);
    const [hideEnd, setHideEnd] = useState<number>(-1);

    useEffect(() => {
        switch (props.hide) {
            case undefined: {
                setHideStart(-1);
                setHideEnd(-1);
                break;
            }
            case "leftHalf": {
                setHideStart(0);
                setHideEnd(Math.floor((props.numDots - 1) / 2) - 1);
                break;
            }
            case "rightHalf": {
                setHideStart(Math.ceil((props.numDots - 1) / 2) + 1);
                setHideEnd(props.numDots - 1);
                break;
            }
        }
    }, [props.hide, props.numDots]);

    return (
        <div className={"relative z-10 flex justify-between"}>
            {Array.from(Array(props.numDots).keys()).map((index) => (
                <Dot
                    mousePosition={props.mousePosition}
                    isHidden={index >= hideStart && index <= hideEnd}
                    key={index}
                />
            ))}
        </div>
    );
}
