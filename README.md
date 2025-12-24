# Sylt Luxury Hotels - Hub & Spoke Architecture

A modern, luxury hotel booking platform for Sylt island, built with Next.js 14, TypeScript, and a Hub & Spoke architecture.

## 🏗️ Architecture

### Hub (blumsylthotels.de)
The central booking engine that handles:
- **Booking Management** - Central booking system for all properties
- **Stripe Integration** - Secure payment processing
- **iCal/Booking.com API Sync** - Calendar synchronization with external platforms
- **Availability Management** - Real-time room availability

### Satellites (Headless Frontends)
Independent frontends that connect to the Hub:

| Satellite | Domain | Description | Port |
|-----------|--------|-------------|------|
| Sylt Rooms | syltrooms.de | 10 exclusive hotel rooms | 3001 |
| Privat Homes | privathomes.de | Luxury vacation homes | 3002 |
| Long Island House | longislandhouse.de | Hampton-style elegance | 3003 |
| Auster Appartements | auster-appartements.de | Modern apartments | 3004 |
| Beach Home | beach-home.de | Beachfront properties | 3005 |

## 🎨 Design System

### "Quiet Luxury" Aesthetic
- Minimalist elegance with premium materials
- Serif typography (Playfair Display & Cormorant)
- Slow motion hero videos
- Parallax scrolling effects
- Premium image galleries

### Sylt Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Sand | `#D4C5B0` | Primary warm tone |
| Reetdach-Grau | `#6B6B6B` | Secondary neutral |
| Nordsee-Blau | `#2C5F77` | Accent & CTAs |

## 📁 Project Structure

```
sylt-luxury-hotels/
├── apps/
│   ├── hub/                    # Central booking engine
│   └── satellites/
│       ├── syltrooms/          # Hotel rooms
│       ├── privathomes/        # Vacation homes
│       ├── longislandhouse/    # Hampton-style
│       ├── auster-appartements/# Apartments
│       └── beach-home/         # Beach properties
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── booking/                # Booking utilities
│   ├── config/                 # Design tokens & config
│   └── types/                  # TypeScript types
├── package.json                # Root package.json
├── turbo.json                  # Turborepo config
└── tsconfig.json               # Base TypeScript config
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 10

### Installation

```bash
# Install dependencies
npm install

# Run all applications in development
npm run dev

# Run specific applications
npm run dev:hub          # Hub on port 3000
npm run dev:syltrooms    # Sylt Rooms on port 3001
```

### Building

```bash
# Build all applications
npm run build

# Type check all packages
npm run type-check
```

## 🔧 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Payments**: Stripe
- **Monorepo**: npm workspaces + Turborepo

## 📦 Shared Packages

### @sylt/ui
Shared UI components with the "Quiet Luxury" design system:
- `HeroVideo` - Full-screen video hero sections
- `Navigation` - Responsive navigation with scroll effects
- `Button` - Styled buttons with variants
- `Card` - Premium card components
- `Gallery` - Premium image gallery with lightbox
- `ParallaxSection` - Parallax scrolling sections
- `BookingWidget` - Date picker and booking form
- `PropertyCard` - Property listing cards
- `AnimatedSection` - Scroll-triggered animations

### @sylt/booking
Booking utilities and API clients:
- `createHubApiClient` - API client for Hub endpoints
- `StripeService` - Stripe payment utilities
- `ICalService` - iCal parsing and generation
- `AvailabilityService` - Availability management

### @sylt/config
Design system tokens and configuration:
- Color palette (Sand, Reetdach, Nordsee)
- Typography settings
- Animation presets
- Satellite configurations
- Tailwind preset

### @sylt/types
Shared TypeScript types:
- Booking types
- Property types
- Room types
- Availability types
- API response types

## 🔌 API Endpoints (Hub)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/properties` | GET | List all properties |
| `/api/properties` | POST | Create property |
| `/api/availability` | GET | Check availability |
| `/api/bookings` | GET/POST | Manage bookings |
| `/api/payments` | GET/POST | Payment intents |

## 🌐 Environment Variables

Create a `.env.local` file in each app:

```env
# Hub
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
DATABASE_URL=postgresql://...

# Satellites
NEXT_PUBLIC_HUB_API_URL=https://api.blumsylthotels.de
```

## 📄 License

Private - BLUM Sylt Hotels

---

Built with ❤️ for Sylt
