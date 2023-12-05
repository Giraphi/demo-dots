import { ReactNode, useEffect, useRef } from "react";
import MousePositionContext from "./MousePositionContext";

export interface MousePositionContextProviderProps {
    children: ReactNode;
}

export default function MousePositionContextProvider(props: MousePositionContextProviderProps) {
    const mousePositionRef = useRef<{ x: number; y: number } | undefined>(undefined);
    // const device = useContext(DeviceContext).device;

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            // if (typeof device === "undefined" || device <= Device.sm) {
            //     return;
            // }
            mousePositionRef.current = { x: e.pageX, y: e.pageY };
        }

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return <MousePositionContext.Provider value={{ mousePositionRef }}>{props.children}</MousePositionContext.Provider>;
}
