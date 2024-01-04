/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'vic-blue': '#00C5FB'
			}
		}
	},
	plugins: [require('daisyui')],
	sans: ['Poppins'],
	daisyui: { themes: ['night'] }
};
