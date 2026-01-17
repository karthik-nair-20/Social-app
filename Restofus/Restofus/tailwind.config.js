import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        'dark': '#0a0b10',
        blue: {
          custom: '#4886ee'
        }
      },
      backgroundImage: {
        'cute-gradient': 'linear-gradient(to right, #ec4899, #8b5cf6, #6366f1)',
      }
  	}
  },
  plugins: [tailwindcssAnimate],
}

