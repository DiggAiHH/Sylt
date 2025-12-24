This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Blum Sylt Hotels - Hub & Spoke Architecture

A Next.js 14 monorepo implementing a Hub & Spoke architecture for Blumsylthotels.de and its satellite brand websites.

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                           SATELLITES                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │ syltrooms.de│ │privathomes  │ │longisland   │ │beach-home   │ │
│  │             │ │     .de     │ │  house.de   │ │    .de      │ │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ │
│         │               │               │               │         │
│         └───────────────┴───────┬───────┴───────────────┘         │
│                                 │                                  │
│                                 ▼                                  │
│         ┌───────────────────────────────────────────────┐         │
│         │                    HUB                         │         │
│         │         booking.blumsylthotels.de             │         │
│         │                                                │         │
│         │  ┌─────────┐ ┌─────────┐ ┌────────────────┐   │         │
│         │  │ Stripe  │ │  iCal   │ │  Availability  │   │         │
│         │  │ Payment │ │  Sync   │ │    Logic       │   │         │
│         │  └─────────┘ └─────────┘ └────────────────┘   │         │
│         └───────────────────────────────────────────────┘         │
└──────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
blumsylthotels-hub-spoke/
├── apps/
│   ├── hub/                 # Central booking engine
│   │   └── src/
│   │       ├── app/         # Next.js App Router
│   │       │   ├── api/     # API routes (bookings, availability, iCal, Stripe)
│   │       │   └── book/    # Booking pages
│   │       └── components/  # Hub-specific components
│   │
│   └── satellite/           # Brand frontend template
│       └── src/
│           ├── app/         # Next.js App Router
│           └── components/  # Satellite-specific components
│
├── packages/
│   ├── shared/              # Shared types, utilities, and configuration
│   │   └── src/
│   │       ├── types/       # TypeScript interfaces
│   │       ├── utils/       # Utility functions
│   │       └── config/      # Theme colors, brand configs
│   │
│   └── ui/                  # Shared UI component library
│       └── src/
│           └── components/  # React components
│
└── package.json             # Root workspace configuration
```

## Brands (Satellites)

| Brand | Domain | Description |
|-------|--------|-------------|
| Sylt Rooms | syltrooms.de | Stilvolle Apartments und Suiten im Herzen von Sylt |
| Privat Homes Sylt | privathomes.de | Exklusive Ferienhäuser für anspruchsvolle Gäste |
| Long Island House | longislandhouse.de | Stilvolle Apartments im Long Island Style |
| Auster Appartements | auster-appartements.de | Geschmackvoll eingerichtete Appartements |
| Beach Home Sylt | beach-home.de | Moderne Ferienwohnungen mit Meerblick |

## Design System

### Theme: Quiet Luxury

The design follows the "Quiet Luxury" aesthetic with:

- **Serif Typography**: Cormorant Garamond for headings
- **Sans-serif**: Inter for body text
- **Generous Whitespace**: Large padding and margins
- **Subtle Animations**: Smooth Framer Motion transitions
- **Parallax Effects**: Engaging scroll-based animations

### Color Palette (Sylt-inspired)

```css
/* Sand - warm beige tones */
sand-500: #b8a182

/* Reetdach-Grau - thatched roof grey */
reetdach-700: #55514a

/* Nordsee-Blau - North Sea blue */
nordsee-600: #2d7a99
```

## Features

### Hub (Central Backend)

- **Booking Engine**: Property listing and booking flow
- **Stripe Integration**: Secure payment processing (placeholder)
- **iCal Sync**: Calendar synchronization for availability
- **Availability Logic**: Date checking and blocking
- **Headless CMS Ready**: Designed for CMS integration

### Satellites (Brand Frontends)

- **Hero Videos**: Full-screen video backgrounds
- **Parallax Scrolling**: Engaging visual effects
- **Booking Overlay**: Dynamic branded booking widget
- **Brand Theming**: Configurable colors per brand
- **Responsive Design**: Mobile-first approach

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Payments**: Stripe
- **Calendar**: iCal.js & ical-generator
- **Monorepo**: npm Workspaces

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9.x or higher

### Installation

```bash
# Install all dependencies
npm install

# Install dependencies for all workspaces
npm install -w apps/hub -w apps/satellite -w packages/shared -w packages/ui
```

### Development

```bash
# Start Hub (port 3000)
npm run dev:hub

# Start Satellite (port 3001)
npm run dev:satellite
```

### Building

```bash
# Build all apps
npm run build

# Build Hub only
npm run build:hub

# Build Satellite only
npm run build:satellite
```

### Type Checking

```bash
npm run type-check
```

## Environment Variables

### Hub (.env)

```env
NEXT_PUBLIC_HUB_URL=https://booking.blumsylthotels.de
NEXT_PUBLIC_API_URL=https://api.blumsylthotels.de
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxx
```

### Satellite (.env)

```env
NEXT_PUBLIC_HUB_URL=https://booking.blumsylthotels.de
NEXT_PUBLIC_BRAND_ID=syltrooms
```

## API Endpoints (Hub)

### Properties
- `GET /api/properties` - List all properties
- `GET /api/properties?brand=syltrooms` - Filter by brand
- `GET /api/properties?featured=true` - Featured properties

### Availability
- `POST /api/availability` - Check availability
- `GET /api/availability?propertyId=xxx&month=2024-12` - Get blocked dates

### Bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings?id=xxx` - Get booking details

### iCal
- `GET /api/ical?propertyId=xxx` - Export iCal feed
- `POST /api/ical` - Import external iCal feed

### Webhooks
- `POST /api/webhooks/stripe` - Stripe webhook handler

## Deployment

Each app can be deployed separately:

1. **Hub**: Deploy to Vercel/AWS as a single instance
2. **Satellites**: Deploy multiple instances, each with different `NEXT_PUBLIC_BRAND_ID`

### Example Vercel Deployment

```bash
# Deploy Hub
vercel --cwd apps/hub

# Deploy Satellite for each brand
NEXT_PUBLIC_BRAND_ID=syltrooms vercel --cwd apps/satellite
NEXT_PUBLIC_BRAND_ID=privathomes vercel --cwd apps/satellite
# etc.
```

## License

Private - All rights reserved.

© 2024 Blum Sylt Hotels
