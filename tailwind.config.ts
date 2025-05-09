import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
				blue: {
					dark: '#0039A6',    // VSP deep blue
					medium: '#0059D6',  // VSP medium blue
					light: '#3B7FFF',   // VSP bright blue
					pale: '#E6F0FF',    // VSP pale blue background
				},
				vsp: {
					blue: '#0039A6',    // Primary VSP blue
					darkgray: '#414042', // VSP dark gray
					lightgray: '#939598', // VSP light gray
					accent: '#00B2E3',  // VSP accent blue 
					highlight: '#4CD2FF', // Bright highlight
					gold: '#D4AF37',    // Premium gold accent
					silver: '#C0C0C0',  // Silver accent
					premium: '#BF9B30', // Rich premium gold
					cream: '#F8F6F0',   // Soft cream background
					navy: '#001F54',    // Deep navy accent
					platinum: '#E5E4E2', // Platinum accent
				},
				highlights: {
					blue: '#0059FF',
					navy: '#002E80',
					sky: '#4CD2FF',
					gold: '#FFD700',
					silver: '#E0E0E0',
					platinum: '#E5E4E2',
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
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
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
				'vsp': ['Poppins', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'premium': '0 10px 30px -5px rgba(0, 57, 166, 0.2), 0 8px 10px -6px rgba(0, 57, 166, 0.1)',
				'premium-hover': '0 20px 30px -10px rgba(0, 57, 166, 0.25), 0 10px 15px -5px rgba(0, 57, 166, 0.15)',
				'highlight': '0 0 15px 2px rgba(76, 210, 255, 0.4)',
				'gold': '0 0 15px 2px rgba(212, 175, 55, 0.4)',
				'vsp-card': '0 10px 25px -3px rgba(0, 31, 84, 0.15), 0 4px 10px -2px rgba(0, 57, 166, 0.1)',
				'vsp-card-hover': '0 20px 35px -10px rgba(0, 31, 84, 0.2), 0 10px 20px -5px rgba(0, 57, 166, 0.15)',
				'premium-gold': '0 10px 25px -5px rgba(191, 155, 48, 0.3), 0 8px 15px -6px rgba(191, 155, 48, 0.2)',
				'premium-blue': '0 15px 30px -5px rgba(0, 57, 166, 0.25), 0 10px 20px -5px rgba(0, 57, 166, 0.15)',
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
				'pulse-premium': {
					'0%, 100%': { 
						boxShadow: '0 0 15px 2px rgba(0, 89, 255, 0.4)' 
					},
					'50%': { 
						boxShadow: '0 0 20px 5px rgba(0, 89, 255, 0.6)' 
					}
				},
				'pulse-gold': {
					'0%, 100%': { 
						boxShadow: '0 0 15px 2px rgba(191, 155, 48, 0.3)' 
					},
					'50%': { 
						boxShadow: '0 0 20px 5px rgba(191, 155, 48, 0.5)' 
					}
				},
				'shimmer': {
					'0%': { 
						backgroundPosition: '-500px 0' 
					},
					'100%': { 
						backgroundPosition: '500px 0' 
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'rotate-slow': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'steam': 'steam 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'pulse-premium': 'pulse-premium 2s ease-in-out infinite',
				'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'float': 'float 6s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 12s linear infinite',
			},
			backgroundImage: {
				'premium-gradient': 'linear-gradient(135deg, #0039A6 0%, #3B7FFF 100%)',
				'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
				'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
				'premium-blue-gradient': 'linear-gradient(135deg, #001F54 0%, #0039A6 50%, #3B7FFF 100%)',
				'premium-gold-gradient': 'linear-gradient(135deg, #9E7B23 0%, #BF9B30 50%, #F9D77F 100%)',
				'premium-card-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F8F6F0 100%)',
				'hero-gradient': 'linear-gradient(135deg, #001F54 0%, #0039A6 60%, #3B7FFF 100%)',
				'card-highlight': 'linear-gradient(135deg, rgba(0, 57, 166, 0.05) 0%, rgba(0, 57, 166, 0.1) 100%)',
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
