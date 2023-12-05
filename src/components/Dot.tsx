import React, { useEffect, useRef } from "react";
import { MousePosition } from "./DotsRowLarge";
import { motion, MotionValue, useSpring } from "framer-motion";
import { round } from "../util/functions";
import { getDistanceVector, getVectorLength } from "../util/functions";

// const StyledDot = styled.div<{ isHidden: boolean }>`
//     width: 4px;
//     height: 4px;
//     border-radius: 4px;
//     background-color: ${(props) => props.theme.color.text}
//         ${(props) =>
//             props.isHidden &&
//             css`
//                 display: none;
//             `};
// `;

export interface AnimatedDotProps {
    isHidden: boolean;
    mousePosition?: MotionValue<MousePosition | undefined>;
}

// https://popmotion.io/api/spring/#spring-props
const springConfig = {
    stiffness: 350,
    damping: 13,
    restDelta: 2,
    restSpeed: 2,
};

export default function Dot(props: AnimatedDotProps) {
    const originalPositionRef = useRef<HTMLDivElement>(null);
    const translateX = useSpring(0, springConfig);
    const translateY = useSpring(0, springConfig);
    const isReset = useRef(false);

    function getModulator(distance: number) {
        const distanceAbs = distance >= 0 ? distance : -distance;
        return 50 / (distanceAbs + 50);
    }

    useEffect(() => {
        function reset() {
            // This check makes sure (0,0) is not set again, while the dot is already moving to that target.
            // (If we'd keep setting (0,0) while the dot is moving, the dot is accelerated again, ultimately causing
            // the dot to oscillate around (0,0)
            if (isReset.current) {
                return;
            }
            isReset.current = true;
            translateX.set(0);
            translateY.set(0);
        }

        if (!props.mousePosition) {
            reset();
            return;
        }

        // Update the motion values translateX and translateY every time props.mousePosition
        // changes, but NOT trigger a react rerender cycle.
        const unsubscribe = props.mousePosition.onChange((latestMousePosition: MousePosition | undefined) => {
            if (!originalPositionRef.current) {
                return;
            }

            if (!latestMousePosition) {
                reset();
                return;
            }

            const dotOriginalPosition: [number, number] = [
                originalPositionRef.current.getBoundingClientRect().left + window.scrollX,
                originalPositionRef.current.getBoundingClientRect().top + window.scrollY,
            ];

            const distanceVector = getDistanceVector([latestMousePosition.x, latestMousePosition.y], dotOriginalPosition);
            const distance = getVectorLength(distanceVector);

            if (distance > 100) {
                reset();
                return;
            }

            const modulator = getModulator(distance);

            const translateVector = [modulator * distanceVector[0], modulator * distanceVector[1]];
            isReset.current = false;
            translateX.set(round(translateVector[0]));
            translateY.set(round(translateVector[1]));
        });

        return () => unsubscribe();
    }, [props.mousePosition, translateX, translateY]);

    return (
        <div ref={originalPositionRef}>
            <motion.div
                style={{
                    x: translateX,
                    y: translateY,
                }}
            >
                <div className={`${props.isHidden ? "hidden" : ""} h-[4px] w-[4px] rounded-[4px] bg-black`}></div>
                {/*<StyledDot isHidden={props.isHidden} />*/}
            </motion.div>
        </div>
    );
}
