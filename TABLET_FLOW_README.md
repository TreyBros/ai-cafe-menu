# AI Café Menu - Tablet Optimized Flow

This is a tablet-optimized version of the VSP AI Café Menu application, designed to provide a premium step-by-step interactive experience for iPad users.

## Overview

The tablet flow transforms the existing single-page application into a guided, page-by-page experience that's optimized for tablet interactions. This provides a more focused, immersive experience where users move through distinct stages of the menu selection process.

## How to Access the Tablet Flow

To access the tablet-optimized flow, use one of these methods:

1. Add `?tablet=true` to the root URL: `http://localhost:5173/?tablet=true`
2. Directly navigate to `/welcome`: `http://localhost:5173/welcome`

## User Flow

The tablet experience consists of the following steps:

1. **Welcome Page** (`/welcome`)
   - Introduction to the VSP AI Café
   - User name input for personalization

2. **Category Selection** (`/categories`)
   - Choose between Featured Items, Full Courses, Workshops, or Coffee Selection

3. **Menu Items** (`/items?category=[category]`)
   - Browse items in the selected category
   - Each item displays key information (title, duration, difficulty, etc.)

4. **Item Details** (`/item-detail/:itemId`)
   - Detailed view of the selected menu item
   - Information about what you'll learn, key points, and highlights

5. **Coffee Pairing** (`/coffee-pairing/:itemId`)
   - Select a complementary coffee for your learning experience
   - Recommended pairings are highlighted based on the selected menu item

6. **Checkout** (`/checkout`)
   - Review your selections
   - Optional email entry for receipt
   - Complete your order

## Key Features

- **Consistent Navigation**: Progress indicator at the top shows current step in the flow
- **Animations**: Smooth transitions and animations enhance the premium feel
- **Responsive Layout**: Optimized for iPad screens but works well on other tablet sizes
- **State Management**: Uses the existing session store to maintain user selections
- **VSP Branding**: Blue and gold color scheme with premium styling elements

## Development Information

The tablet flow was built using:

- React with TypeScript
- React Router for navigation
- Framer Motion for animations
- TailwindCSS for styling
- Zustand for state management (via existing session store)

### Component Structure

- `TabletLayout.tsx`: Wrapper component that provides the consistent layout, navigation, and progress indicators
- Page components:
  - `WelcomePage.tsx`
  - `CategoryPage.tsx`
  - `ItemsPage.tsx`
  - `ItemDetailPage.tsx`
  - `CoffeePairingPage.tsx`
  - `CoffeePage.tsx`
  - `CheckoutPage.tsx`

## Getting Started

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Access the tablet flow: `http://localhost:5173/welcome`

## Notes

- The tablet flow and standard flow coexist in the application
- The root route (`/`) will redirect to the tablet flow if the URL includes `?tablet=true` or if you've previously accessed a tablet flow page
- You can always access the original single-page experience at `/index` 