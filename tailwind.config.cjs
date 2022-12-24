/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: '420px',
			},
			fontFamily: {
				heading: ['"Merriweather"', 'serif'],
				body: ['"IBM Plex Sans"', 'sans-serif'],
			},
			colors: {
				tan: {
					50: '#d0b797',
					100: '#cbb08d',
					200: '#c6a882',
					300: '#c09f75',
					400: '#ba9567',
					500: '#b38a58',
					600: '#a37d50',
					700: '#947249',
					800: '#876842',
					900: '#7b5f3c',
				},
				frog: {
					50: '#888c53',
					100: '#7c8042',
					200: '#6f732f',
					300: '#636b30',
					400: '#566331',
					500: '#495b32',
					600: '#3c5233',
					700: '#31492d',
					800: '#264027',
					900: '#233a23',
				},
				'rich-blue': {
					50: '#648696',
					100: '#547a8c',
					200: '#486a7a',
					300: '#3b5b68',
					400: '#2c4853',
					500: '#1b313b',
					600: '#13262f',
					700: '#0a1c24',
					800: '#091820',
					900: '#08161c',
				}
			}
		},
	},
	plugins: [],
};
