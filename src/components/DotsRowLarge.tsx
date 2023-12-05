import React, { useCallback, useEffect, useRef } from "react";
import DotsLine from "./DotsLine";
// import { useInView } from "react-intersection-observer";
import { useMotionValue } from "framer-motion";

export interface DotsRowLargeProps {
    margin: number;
    numDots: number;
    numRows: number;
}

export type MousePosition = { x: number; y: number };

export default function DotsRowLarge(props: DotsRowLargeProps) {
    const timeoutPending = useRef(false);
    // const [ref, inView] = useInView();
    const mousePosition = useMotionValue<MousePosition | undefined>(undefined);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (timeoutPending.current) {
                return;
            }

            timeoutPending.current = true;

            // For performance tweaking we could set this only ever 10 - 100ms (with timeout
            // and timeoutPending refs) but it seems to work fine.
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
