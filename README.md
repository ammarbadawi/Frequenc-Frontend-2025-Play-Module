## Environment configuration

Set the following environment variables in a `.env` file (or your hosting env):

```
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

`VITE_API_URL` should point at the API gateway. `VITE_GOOGLE_MAPS_API_KEY` is required for the venue detail map.

# 🏟️ Frequenc Frontend Play Module

A modern React-based play module with microservices architecture for venue booking and marketplace functionality. Built with TypeScript, Vite, and Material-UI for a seamless user experience.

![React](https://img.shields.io/badge/React-19.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.19-purple.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

- **🏪 Marketplace**: Browse and filter venues by category, location, and date
- **📍 Venue Details**: Comprehensive venue pages with Google Maps integration
- **📅 Booking System**: Advanced booking calendar and reservation management
- **🎯 Smart Filtering**: Filter by sports category, location, date, and search terms
- **📱 Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **🔐 Authentication**: Secure user authentication and protected routes
- **💳 Payment Integration**: Built-in payment processing components
- **🔔 Notifications**: Real-time notification system
- **👥 Social Features**: Friend management and player lists

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Frequenc-Frontend-2025-Play-Module.git
   cd Frequenc-Frontend-2025-Play-Module
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Add your Google Maps API key:

   ```
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Navigation and header components
│   ├── Footer/         # Footer components
│   ├── createGame/     # Game creation components
│   └── paymentComp/    # Payment-related components
├── pages/              # Main application pages
│   ├── home.tsx        # Homepage
│   ├── marketplace/    # Venue marketplace
│   ├── detailpage.tsx  # Venue details
│   └── profile.tsx     # User profile
├── services/           # API service layer
├── contexts/           # React contexts
└── styles/             # CSS and SCSS files
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

1. Update `homepage` in `package.json`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy script: `"deploy": "gh-pages -d build"`
4. Run: `npm run deploy`

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 🔧 Configuration

### Google Maps Integration

To enable Google Maps features:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/)
2. Enable the following APIs:
   - Maps JavaScript API
   - Places API
3. Add to your `.env` file:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

### Environment Variables

Create a `.env` file with:

```
VITE_API_BASE_URL=your_backend_api_url
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 🧪 Testing

```bash
npm run test
```

## 📦 Dependencies

### Core

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### UI Components

- **Material-UI** - Component library
- **FontAwesome** - Icons
- **Swiper** - Carousel/slider
- **React Slick** - Additional carousel

### State & Routing

- **React Router DOM** - Client-side routing
- **React Context** - State management

### Utilities

- **Axios** - HTTP client
- **Socket.io** - Real-time communication
- **Sass** - CSS preprocessing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Material-UI for the component library
- Vite team for the fast build tool
- All contributors and supporters

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Made with ❤️ by the Frequenc Team**
