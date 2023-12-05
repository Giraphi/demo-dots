/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    plugins: [],
    theme: {
        extend: {
            cursor: {
                "left-arrow": "url('/src/images/cursor-svgs/arrow-left.svg') 24 24, pointer",
                "right-arrow": "url('/src/images/cursor-svgs/arrow-right.svg') 24 24, pointer",
            },
        },
    },
};
