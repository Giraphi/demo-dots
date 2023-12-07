# Code Demo: Dots Component

-   Stack: vite, react
-   Run with `npm run dev`

## Design Idea

The design for this component was developed during the work on a larger website designed by the Italian design studio <a href="https://vicinedesign.com/">Vicine</a>. The design team requested an animated "Dots"-component that would respond with physically convincing movements to cursor hover.

After some research I designed the technical motion system for the dots and implemented it.

## Technical Concept

Listen to current cursor position and update each dot's relative position accordingly. Animate with framer-motion's <a href="https://www.framer.com/motion/use-spring/">`useSpring()`</a>.

## Implementation

-   Depending on the available screen width, we calculate the amount of dots we want to have and render them as simples `<div>`s with round border.
-   Listen to the current cursor position and make the coordinates accessible in a react context as a reference with `useRef()`.
-   Every dot subscribes to changes of the mouse position and updates its own relative position if it is close enough. Do some vector calculation to find the new target position: Dots are moving in the direction of the current mouse position. The amount depends on how close the anchor position is.
-   Instead of simply updating the position, we animate this with framer-motion's <a href="https://www.framer.com/motion/use-spring/">`useSpring()`</a>. Tuning `useSpring` with the right parameters results in a physically convincing movement.
