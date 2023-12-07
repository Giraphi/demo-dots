import React, { useCallback, useEffect, useRef } from "react";
import DotsLine from "./DotsLine";
import { useMotionValue } from "framer-motion";

export interface DotsRowLargeProps {
    numDots: number;
    numRows: number;
}

export type MousePosition = { x: number; y: number };

export default function DotsRowLarge(props: DotsRowLargeProps) {
    const timeoutPending = useRef(false);
    const mousePosition = useMotionValue<MousePosition | undefined>(undefined);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (timeoutPending.current) {
                return;
            }

            timeoutPending.current = true;

            // To improve performance, we could set this only ever 10 - 100ms (with timeout
            // and timeoutPending refs) but it seems to work fine in the current setup.
            mousePosition.set({ x: e.pageX, y: e.pageY });
            timeoutPending.current = false;
        },
        [mousePosition],
    );

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            mousePosition.set(undefined);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [handleMouseMove, mousePosition]);

    return (
        <div className={"w-full"}>
            {[...Array(props.numRows)].map((item, index) => (
                <div
                    key={index}
                    className={`${index !== props.numRows - 1 ? "mb-[50px]" : ""}`}
                >
                    <DotsLine
                        numDots={props.numDots}
                        mousePosition={mousePosition}
                    />
                </div>
            ))}
        </div>
    );
}
