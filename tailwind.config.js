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
		},
	},
	plugins: [],
};
