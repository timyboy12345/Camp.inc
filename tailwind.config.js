/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "grass": "#6cbb41",
                "brown": "#795548",
                "brown-50": "#efebe9",
                "brown-100": "#d7ccc8",
                "brown-200": "#bcaaa4",
                "brown-300": "#a1887f",
                "brown-400": "#8d6e63",
                "brown-500": "#795548",
                "brown-600": "#6d4c41",
                "brown-700": "#5d4037",
                "brown-800": "#4e342e",
                "brown-900": "#3e2723",
            }
        },
    },
    plugins: [],
}
