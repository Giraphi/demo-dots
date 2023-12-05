import React, { useEffect, useRef, useState } from "react";
import DotsRowLarge from "./DotsRowLarge";
import DotsRowSmall from "./DotsRowSmall";
import MousePositionContextProvider from "../context/MousePositionContextProvider";

export interface DotsRowProps {
    addHalfTop?: boolean;
    addHalfBottom?: boolean;
    align?: "left" | "right";
    negativeMargin?: "top" | "bottom";
}

export default function DotsRow(props: DotsRowProps) {
    const ref = useRef<HTMLDivElement>(null);
    const timeout = useRef<number>();
    const [margin, setMargin] = useState(0);
    const [numDotsHorizontal, setNumDotsHorizontal] = useState(0);
    // const [numRows, setNumRows] = useState(2);

    // useEffect(() => {
    //     if (typeof props.numRows === "number") {
    //         setNumRows(props.numRows);
    //         return;
    //     }
    //
    //     if (typeof props.numRows === "string") {
    //         setNumRows(Number(props.numRows));
    //         return;
    //     }
    //
    //     setNumRows(2);
    // }, [props.numRows]);

    function updateParameters(width: number) {
        let n = 0;
        let margin = 0;

        while (n < 200) {
            n += 1;
            margin = (width - 4) / n - 4;

            if (margin <= 70 && margin >= 50) {
                setMargin(Math.floor(margin));
                setNumDotsHorizontal(n + 1);
                return;
            }
        }

        setMargin(Math.floor(margin));
        setNumDotsHorizontal(n);
    }

    useEffect(() => {
        function onResize() {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }

            timeout.current = setTimeout(() => {
                if (!ref.current) {
                    return;
                }
                updateParameters(ref.current.offsetWidth);
            }, 100);
        }

        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <MousePositionContextProvider>
            <div
                ref={ref}
                className={"overflow-hidden p-[200px]"}
            >
                <div className={"md:hidden"}>
                    <DotsRowSmall
                        margin={margin}
                        numDots={numDotsHorizontal}
                    />
                </div>

                <div className={"hidden w-full md:flex"}>
                    <DotsRowLarge
                        numRows={4}
                        margin={margin}
                        numDots={numDotsHorizontal}
                    />
                </div>
            </div>
        </MousePositionContextProvider>
    );
}
