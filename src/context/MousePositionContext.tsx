import { createContext, RefObject } from "react";

export interface MousePositionContextType {
    mousePositionRef?: RefObject<{ x: number; y: number } | undefined>;
}

export const MousePositionContext = createContext<MousePositionContextType>({});

export default MousePositionContext;
