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
- `Testimonials` - Customer testimonials display
- `ContactForm` - Contact form with validation
- `ImageCarousel` - Animated image carousel with thumbnails
- `Skeleton` - Loading skeleton components
- `Stats` - Statistics display component
- `FeatureGrid` - Feature grid layout
- `Badge` - Status and label badges
- `Accordion` - Expandable FAQ sections
- `ErrorBoundary` - React error boundary with fallback UI
- `AsyncBoundary` - Combined error + suspense boundary
- `useFetch` - Data fetching hook with caching and retry
- `useDebounce` - Debounced value hook

### @sylt/booking
Booking utilities and API clients:
- `createHubApiClient` - API client for Hub endpoints
- `StripeService` - Stripe payment utilities
- `ICalService` - iCal parsing and generation
- `AvailabilityService` - Availability management
- `validateBookingRequest` - Booking validation utilities
- `formatPrice`, `formatDate` - Formatting helpers
- `RateLimiter` - Token bucket rate limiting
- `CacheService` - In-memory caching with TTL
- `logger` - Structured logging service

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
| `/api/health` | GET/HEAD | Health check for monitoring |

## 🛡️ Security Features

- **Rate Limiting**: Token bucket algorithm (100 req/min per client)
- **CORS**: Configured for satellite domains only
- **Request Tracing**: X-Request-ID headers for debugging
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, etc.
- **Input Validation**: Comprehensive validation for all API inputs
- **HTML Sanitization**: XSS prevention utilities

## 🔍 SEO Features

### Comprehensive SEO Implementation
- **Schema.org Structured Data**: JSON-LD for Organization, Hotel, FAQPage, LocalBusiness, BreadcrumbList
- **Dynamic Sitemap**: Auto-generated sitemap.xml with proper priorities
- **Robots.txt**: Configured crawler rules with AI bot blocking
- **Open Graph**: Full social sharing optimization for Facebook/LinkedIn
- **Twitter Cards**: Large image cards for Twitter/X sharing
- **Canonical URLs**: Prevent duplicate content issues
- **Geographic Targeting**: Geo meta tags for local search

### SEO Utilities (@sylt/config)
- `generateMetadata` - Unified metadata generator for all pages
- `generateOrganizationSchema` - Organization JSON-LD
- `generateHotelSchema` - Hotel/LodgingBusiness JSON-LD
- `generateFaqSchema` - FAQ rich snippets
- `generateBreadcrumbSchema` - Breadcrumb navigation
- `generateLocalBusinessSchema` - Local search optimization

### SEO Components (@sylt/ui)
- `JsonLd` - Schema.org structured data component
- `MultipleJsonLd` - Multiple schemas component
- `OptimizedImage` - Lazy loading with blur placeholder
- `HeroImage` - Priority loading for LCP optimization

### Dynamic OG Images
- Auto-generated Open Graph images with branding
- Consistent social card appearance across all shares

## ♿ Accessibility Features (WCAG 2.1 AA)

### Senior-Friendly Design
This platform is optimized for elderly users with:
- **Large Touch Targets**: Minimum 44x44px (48px recommended)
- **Readable Typography**: 18px base font size with 1.6 line height
- **High Contrast Colors**: Text meets WCAG AA contrast ratios (4.5:1)
- **Clear Focus Indicators**: Thick, visible focus rings (4px) for keyboard navigation
- **Reduced Motion Support**: Respects `prefers-reduced-motion` preference
- **Font Scaling**: User-adjustable font sizes (100%, 115%, 130%)

### Accessibility Components (@sylt/ui)
- `SkipLink` - Skip to main content for keyboard users
- `SkipLinksGroup` - Multiple skip links for complex pages
- `AccessibilityControls` - Floating widget for font size adjustment
- `AccessibilityProvider` - Context provider for accessibility settings
- `useAccessibility` - Hook to access/modify accessibility settings
- `useReducedMotion` - Hook to detect reduced motion preference

### Accessibility Configuration (@sylt/config)
- `a11yFontSizes` - Optimized font size scales (default/large)
- `touchTargets` - Minimum touch target sizes
- `focusStyles` - Focus ring configuration
- `highContrastColors` - Enhanced contrast color palette
- `ariaLabels` - Centralized ARIA labels (German)
- `errorMessages` - Clear, actionable error messages

### Implemented Features
- ✅ Skip Links for keyboard navigation
- ✅ ARIA landmarks and labels (German)
- ✅ Focus-visible styling (not :focus)
- ✅ Reduced motion support
- ✅ Font scaling controls
- ✅ High contrast mode
- ✅ Large form fields (52px height)
- ✅ Screen reader friendly error messages
- ✅ Semantic HTML with proper heading hierarchy

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
