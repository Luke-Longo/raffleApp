/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	darkMode: "class",
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#1A6A1A",
				secondary: "#248924",
				tertiary: "#d6d6d6",
				hover: "#1d72e9",
				darkBg: "#282828",
				darkPrimary: "#02ad24",
				darkSecondary: "#EEEEEE",
				light: "rgb(203 213 225)",
				black: "#181818",
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ["even", "odd"],
		},
	},
	plugins: [],
};
