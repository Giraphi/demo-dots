import React from "react";
import DotsLine from "./DotsLine";

export interface DotsRowSmallProps {
    margin: number;
    numDots: number;
}

export default function DotsRowSmall(props: DotsRowSmallProps) {
    return (
        <>
            <div style={{ marginBottom: `${props.margin}px` }}>
                <DotsLine numDots={props.numDots} />
            </div>
            <div>
                <DotsLine numDots={props.numDots} />
            </div>
        </>
    );
}
