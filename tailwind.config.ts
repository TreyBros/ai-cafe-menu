import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				coffee: {
					dark: '#0F3460',
					medium: '#1A5F7A',
					light: '#57C5B6',
					cream: '#E0F4FF',
					paper: '#F0F9FF',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					teal: '#2192FF',
					orange: '#38B6FF',
					yellow: '#89CFF3',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				'cafe': ['Playfair Display', 'serif'],
				'sans': ['Poppins', 'sans-serif'],
				'chalk': ['Caveat', 'cursive'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'coffee-paper': "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2357C5B6' fill-opacity='0.05'%3E%3Ccircle cx='50' cy='50' r='20'/%3E%3Ccircle cx='0' cy='0' r='15'/%3E%3Ccircle cx='100' cy='0' r='15'/%3E%3Ccircle cx='100' cy='100' r='15'/%3E%3Ccircle cx='0' cy='100' r='15'/%3E%3C/g%3E%3C/svg%3E')",
				'grid-pattern': "url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231A5F7A' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z'/%3E%3C/g%3E%3C/svg%3E')",
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'steam': {
					'0%, 100%': {
						transform: 'translateY(0) scale(1)',
						opacity: '0.5'
					},
					'50%': {
						transform: 'translateY(-10px) scale(1.2)',
						opacity: '0.1'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pour': {
					'0%': {
						height: '0%',
						opacity: '0.7'
					},
					'100%': {
						height: '100%',
						opacity: '1'
					}
				},
				'bounce-in': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.05)',
					},
					'70%': {
						transform: 'scale(0.95)',
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'fall': {
					'0%': {
						transform: 'translateY(-10px) rotate(0deg)',
						opacity: '0',
					},
					'10%': {
						opacity: '1',
					},
					'100%': {
						transform: 'translateY(100vh) rotate(360deg)',
						opacity: '0',
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'steam': 'steam 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'pour': 'pour 1.5s ease-in-out forwards',
				'bounce-in': 'bounce-in 0.5s ease-out',
				'fall': 'fall 3s ease-in forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
