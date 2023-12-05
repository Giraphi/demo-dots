import React, { useEffect, useRef, useState } from "react";
import DotsRowLarge from "./DotsRowLarge";
import MousePositionContextProvider from "../context/MousePositionContextProvider";

export interface DotsRowProps {
    addHalfTop?: boolean;
    addHalfBottom?: boolean;
    align?: "left" | "right";
}

export default function DotsRow(props: DotsRowProps) {
    const ref = useRef<HTMLDivElement>(null);
    const timeout = useRef<number>();
    const [numDotsHorizontal, setNumDotsHorizontal] = useState(0);

    function updateParameters(width: number) {
        let n = 0;
        let margin = 0;

        while (n < 200) {
            n += 1;
            margin = (width - 4) / n - 4;

            if (margin <= 70 && margin >= 50) {
                setNumDotsHorizontal(n + 1);
                return;
            }
        }

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
                className={"overflow-hidden px-24 py-36"}
            >
                <DotsRowLarge
                    numRows={8}
                    numDots={numDotsHorizontal}
                />
            </div>
        </MousePositionContextProvider>
    );
}
