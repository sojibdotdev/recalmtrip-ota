# RecalmTrip - Online Travel Agency

A modern, responsive travel booking website built with Next.js 15, inspired by Expedia's design and optimized for the Bangladesh market. Features advanced animations with Framer Motion, comprehensive search functionality, user authentication, and admin management.

## Features

- **Multi-language Support**: Bengali and English toggle
- **Multi-currency**: BDT (৳) and USD ($) support
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Modern UI**: Clean, Expedia-inspired design with Tailwind CSS
- **Custom Typography**: Bai Jamjuree font family with multiple weights
- **Search Functionality**: Tabbed search for Flights, Hotels, eSIM, and Tour Packages
- **Advanced Filters**: Comprehensive filtering system for all search types
- **Smooth Animations**: Framer Motion integration for enhanced UX
- **User Authentication**: Session-based login/register system
- **User Dashboard**: Personalized user experience with activity tracking
- **Admin Dashboard**: Complete user management system
- **Registration Incentives**: Popup with discount offers for new users
- **Functional Navigation**: Working search forms that navigate to results pages
- **Deal Sections**: Flight deals, hotel recommendations, last-minute deals
- **API Ready**: Structured for Travelpayouts and partner integrations

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Typography**: Bai Jamjuree Google Font
- **Authentication**: Session-based (localStorage + cookies)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd recalmtrip-ota
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install framer-motion
npm install
# or
yarn add framer-motion && yarn install
# or
pnpm add framer-motion && pnpm install
# or
bun add framer-motion && bun install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

### Admin Credentials
- **Username**: `admin`
- **Password**: `recalmtrip2025`
- **Access URL**: [http://localhost:3000/admin](http://localhost:3000/admin)

The admin dashboard allows you to:
- View all registered users
- Add new users manually
- Monitor user registration statistics
- Manage user data

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx              # Root layout with font loading
│   ├── page.tsx                # Homepage with registration popup
│   ├── login/                  # User login page
│   ├── register/               # User registration page
│   ├── dashboard/              # User dashboard
│   ├── admin/                  # Admin dashboard
│   ├── flight-results/         # Flight search results with filters
│   ├── hotel-results/          # Hotel search results with filters
│   ├── esim-results/           # eSIM search results with filters
│   ├── tour-results/           # Tour package results with filters
│   └── globals.css             # Global styles and font classes
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── header.tsx              # Updated navigation header
│   ├── search-form.tsx         # Tabbed search interface with navigation
│   ├── search-filters.tsx      # Comprehensive filter system
│   ├── search-summary.tsx      # Search criteria summary
│   ├── registration-popup.tsx  # Discount offer popup
│   ├── hero-section.tsx        # Hero banner
│   ├── promotional-banners.tsx # Animated promotional sections
│   ├── flight-deals.tsx        # Animated flight deals
│   ├── hotel-recommendations.tsx
│   ├── last-minute-deals.tsx
│   ├── unique-stays.tsx
│   ├── footer.tsx
│   ├── api-simulation.tsx      # Extended API integration structure
│   └── loading-skeleton.tsx    # Loading states for results
└── README.md
\`\`\`

## Authentication System

### User Authentication
- **Registration**: `/register` - Create new user accounts
- **Login**: `/login` - User authentication
- **Dashboard**: `/dashboard` - Personalized user experience
- **Session Management**: Cookie-based sessions with localStorage

### Features
- Form validation and error handling
- Password visibility toggle
- Terms and conditions agreement
- Automatic redirect after authentication
- Session persistence across browser sessions

## Search Functionality

The application includes functional search with comprehensive filtering:

### 1. Flights (`/flight-results`)
- **Search Fields**: From, To, Departure/Return dates, Travelers
- **Filters**: Price range, stops, airlines, departure times, duration
- **Results**: Flight options with airline details, pricing, and booking

### 2. Hotels (`/hotel-results`)
- **Search Fields**: Destination, Check-in/Check-out dates, Travelers/Rooms
- **Filters**: Price range, star rating, amenities, distance from center
- **Results**: Hotel listings with amenities, ratings, and pricing

### 3. eSIM (`/esim-results`)
- **Search Fields**: Destination, Duration
- **Filters**: Price range, data amount, duration, provider
- **Results**: eSIM plans with data allowances, pricing, and setup instructions

### 4. Tour Packages (`/tour-results`)
- **Search Fields**: Destination, Start/End dates
- **Filters**: Price range, tour type, duration, rating
- **Results**: Tour packages with itineraries, inclusions, and pricing

## Animations with Framer Motion

Enhanced user experience with smooth animations:

- **Tab Switching**: Smooth transitions between search tabs
- **Filter Animations**: Collapsible filter sections
- **Card Animations**: Staggered fade-in effects for deal cards
- **Button Interactions**: Scale animations on hover and tap
- **Page Transitions**: Smooth entry animations for result pages
- **Loading States**: Animated skeleton loaders
- **Popup Animations**: Spring-based registration popup

## User Dashboard Features

### Personal Information
- User profile display
- Contact information management
- Registration date tracking
- Quick stats overview

### Activity Tracking
- Search history
- Saved trips
- Booking history
- Recent activity table

### Quick Actions
- Direct access to search functions
- Saved items management
- Booking management
- Settings access

## Admin Dashboard Features

### User Management
- Complete user list with details
- Add new users manually
- User registration statistics
- Registration source tracking (self vs admin)

### System Overview
- Total user count
- New registrations tracking
- System status monitoring
- Admin session management

## Registration Incentives

### Popup System
- Appears after 3 seconds for non-logged users
- 10% discount offer for new registrations
- Dismissible with "maybe later" option
- Prevents repeated showing using localStorage

### Benefits Highlighted
- Exclusive member prices
- Personalized recommendations
- Easy booking management
- Special offers and deals

## Font Usage

The project uses the Bai Jamjuree font family:

- `.bai-jamjuree-extralight` (200)
- `.bai-jamjuree-light` (300)
- `.bai-jamjuree-regular` (400) - Default body text
- `.bai-jamjuree-medium` (500)
- `.bai-jamjuree-semibold` (600)
- `.bai-jamjuree-bold` (700) - Headings

Italic variants available with `-italic` suffix.

## API Integration Structure

Enhanced API simulation for all search types:

- **Flight Search**: Aviasales integration (`/api/v1/flight_search`)
- **Hotel Search**: Hotellook integration (`/api/hotels/search`)
- **eSIM Search**: Provider integration (`/api/esim/search`)
- **Tour Search**: Package integration (`/api/tour/search`)
- **User Management**: Authentication endpoints
- **Analytics Tracking**: User interaction monitoring
- **24-hour Caching**: API compliance simulation

## Responsive Design

Fully responsive across all device sizes:

### Mobile (< 768px)
- Collapsible filter sidebar
- Stacked search forms
- Touch-optimized interactions
- Simplified navigation

### Tablet (768px - 1024px)
- Adaptive layouts
- Balanced content presentation
- Optimized for both orientations

### Desktop (> 1024px)
- Full sidebar filters
- Complete feature set
- Enhanced animations
- Multi-column layouts

## Development Notes

### Session Management
- Uses cookies for session tracking
- localStorage for user data persistence
- Automatic session validation
- Secure logout functionality

### Data Storage
- Mock backend using localStorage
- User data persistence
- Admin-added user tracking
- Activity history simulation

### Security Considerations
- Input validation on all forms
- XSS prevention measures
- Session timeout handling
- Admin credential protection

## Deployment

Ready for deployment on Vercel, Netlify, or any Next.js 15 compatible platform.

### Environment Variables
Set up for production:
- `TRAVELPAYOUTS_TOKEN`: API token for flight/hotel searches
- `ESIM_PROVIDER_TOKEN`: API token for eSIM services
- `TOUR_PROVIDER_TOKEN`: API token for tour packages
- `ANALYTICS_ID`: Analytics tracking ID
- `ADMIN_USERNAME`: Admin username (default: admin)
- `ADMIN_PASSWORD`: Admin password (default: recalmtrip2025)

### Build Commands
\`\`\`bash
npm run build
npm run start
\`\`\`

## Testing

### User Flow Testing
1. Homepage registration popup
2. User registration/login flow
3. Search functionality across all tabs
4. Filter system operation
5. Dashboard access and features
6. Admin dashboard functionality

### Admin Testing
1. Access admin dashboard with provided credentials
2. View user list
3. Add new users
4. Monitor statistics

## Future Enhancements

- **Real API Integration**: Replace simulation with actual providers
- **Payment Gateway**: Secure payment processing
- **Booking Management**: Complete booking flow
- **Email Notifications**: Registration and booking confirmations
- **Advanced Analytics**: User behavior tracking
- **Multi-language Content**: Dynamic content translation
- **Mobile App**: React Native/Flutter companion
- **Push Notifications**: Deal alerts and updates
- **Social Login**: Google/Facebook authentication
- **Advanced Search**: AI-powered recommendations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request
5. Follow code review process

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation
- Access admin dashboard for user management

---

**Note**: This application uses mock data and localStorage for demonstration. Implement proper backend services, database integration, and security measures before production deployment.

**Admin Access**: Use username `admin` and password `recalmtrip2025` to access the admin dashboard at `/admin`.
# recalmtrip-ota
