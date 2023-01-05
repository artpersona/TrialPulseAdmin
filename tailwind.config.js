/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	mode: "jit",
	// purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			"2md": "992px",
			...defaultTheme.screens,
		},
		extend: {
			screens: {
				"3xl": "1600px",
			},
			colors: {
				green: {
					primary: "#008D4F",
					light: "#00BD4F",
				},
				gray: {
					primary: "#6B6B6B",
					secondary: "#93A1AF",
					light: "#EDEDED",
				},
				blue: {
					primary: "#015EAA",
				},
				yellow: {
					primary: "#FDA92B",
					secondary: "#FDE077",
				},
				red: {
					primary: "#D95450",
					secondary: "#D96966",
				},
			},
		},
	},
	plugins: [],
};
