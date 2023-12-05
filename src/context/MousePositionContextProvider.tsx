import React, { ReactNode, useEffect, useRef } from "react";
import MousePositionContext from "./MousePositionContext";

export interface MousePositionContextProviderProps {
    children: ReactNode;
}

export default function MousePositionContextProvider(props: MousePositionContextProviderProps) {
    const mousePositionRef = useRef<{ x: number; y: number } | undefined>(undefined);

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            mousePositionRef.current = { x: e.pageX, y: e.pageY };
        }

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return <MousePositionContext.Provider value={{ mousePositionRef }}>{props.children}</MousePositionContext.Provider>;
}
