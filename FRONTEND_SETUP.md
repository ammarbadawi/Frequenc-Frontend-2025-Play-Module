# 🚀 FrequenC Frontend Setup Guide

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see backend/SETUP.md)

## 🛠️ Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
```bash
cp env.example .env
# Edit .env with your configuration
```

### 3. Start Development Server
```bash
npm start
```

The app will open at: http://localhost:3000

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3000

# WebSocket Configuration
REACT_APP_WS_URL=ws://localhost:3000

# Feature Flags
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENABLE_REAL_TIME=true

# External Services
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key_here

# Analytics
REACT_APP_GA_TRACKING_ID=your_ga_tracking_id_here
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.js        # Navigation header
│   ├── Footer.js        # Footer component
│   ├── ProtectedRoute.js # Authentication guard
│   ├── ErrorBoundary.js # Error handling
│   ├── LoadingSpinner.js # Loading states
│   └── ...
├── pages/               # Page components
│   ├── home.js          # Homepage
│   ├── profile.js       # User profile
│   ├── notifications.js # Notifications
│   ├── cart.js          # Shopping cart
│   ├── favorites.js     # User favorites
│   └── ...
├── services/            # API services
│   ├── api.js           # Base API configuration
│   ├── authService.js   # Authentication
│   ├── venuesService.js # Venue management
│   ├── bookingsService.js # Booking system
│   ├── paymentsService.js # Payment processing
│   ├── gamesService.js  # Game management
│   ├── notificationsService.js # Notifications
│   ├── marketplaceService.js # Product catalog
│   └── usersService.js  # User management
├── contexts/            # React contexts
│   └── AuthContext.js   # Authentication state
├── styles/              # CSS/SCSS files
├── assets/              # Images and static files
└── routes.js            # Route configuration
```

## 🔐 Authentication

The app uses JWT-based authentication with the following features:

- **Protected Routes**: Routes that require authentication
- **Token Management**: Automatic token refresh
- **User Context**: Global user state management
- **Login/Register**: User authentication forms

### Protected Routes
- `/profile` - User profile
- `/cart` - Shopping cart
- `/favorites` - User favorites
- `/notifications` - User notifications
- `/payment` - Payment processing
- `/booking_info` - Booking management

## 🎯 Features

### Core Features
- ✅ **User Authentication** - Login, register, profile management
- ✅ **Venue Browsing** - Search and view sports venues
- ✅ **Booking System** - Court and game booking
- ✅ **Payment Processing** - Cart and payment management
- ✅ **Game Management** - Create and join games
- ✅ **Notifications** - Real-time notifications
- ✅ **User Profiles** - Profile management and social features
- ✅ **Favorites** - Save favorite venues
- ✅ **Marketplace** - Product catalog and orders

### Technical Features
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Error Handling** - Global error boundaries
- ✅ **Loading States** - Better user experience
- ✅ **Protected Routes** - Authentication guards
- ✅ **API Integration** - Full backend integration
- ✅ **Real-time Updates** - WebSocket support

## 🚀 Development Workflow

### 1. Start Backend First
```bash
cd backend
npm run setup
npm run start:gateway
```

### 2. Start Frontend
```bash
npm start
```

### 3. Development Commands
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (if needed)
npm run eject
```

## 🔧 API Integration

### Services Available
- **AuthService** - Authentication and user management
- **VenuesService** - Venue browsing and management
- **BookingsService** - Booking creation and management
- **PaymentsService** - Cart and payment processing
- **GamesService** - Game creation and participation
- **NotificationsService** - Real-time notifications
- **MarketplaceService** - Product catalog and orders
- **UsersService** - User profiles and social features

### API Base URL
The app connects to the backend API at: `http://localhost:3000`

## 🎨 Styling

The app uses:
- **SCSS** for custom styles
- **Bootstrap** for responsive grid
- **Material-UI** for components
- **FontAwesome** for icons
- **Swiper** for carousels

## 📱 Responsive Design

The app is fully responsive with:
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interfaces
- Adaptive layouts

## 🔍 Testing

### Manual Testing
1. **Authentication Flow**
   - Register new user
   - Login with credentials
   - Access protected routes
   - Logout functionality

2. **Venue Browsing**
   - Search venues
   - View venue details
   - Add to favorites
   - Book courts

3. **Booking System**
   - Create bookings
   - View booking history
   - Cancel bookings

4. **Payment Flow**
   - Add items to cart
   - Process payments
   - View order history

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**
   - Ensure backend is running
   - Check API URL in `.env`
   - Verify CORS settings

2. **Authentication Issues**
   - Clear localStorage
   - Check token expiration
   - Verify backend auth service

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check for dependency conflicts
   - Verify Node.js version

### Debug Commands
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for dependency issues
npm audit

# Run in development mode
npm start
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
```env
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_WS_URL=wss://your-api-domain.com
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENABLE_REAL_TIME=true
```

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify backend API is running
3. Check environment configuration
4. Review API documentation at `/api`

## 🎯 Next Steps

1. **Real-time Features** - WebSocket integration
2. **Push Notifications** - Browser notifications
3. **Offline Support** - Service workers
4. **Performance** - Code splitting and optimization
5. **Testing** - Unit and integration tests
6. **Analytics** - User behavior tracking 