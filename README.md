# Frequenc-Frontend-2025-Play-Module
To develop new play module with microservices architecture

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Google Maps API Key Setup
The venue detail page includes Google Maps integration. To enable this feature:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/)
2. Enable the following APIs:
   - Maps JavaScript API
   - Places API
3. Create a `.env` file in the project root with your API key:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

### Running the Project
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Features
- **Marketplace**: Browse and filter venues by category, location, and date
- **Venue Details**: Detailed venue pages with Google Maps integration, booking calendar, and reviews
- **Responsive Design**: Mobile and tablet friendly interface
- **Filtering**: Advanced filtering by sports category, location, date, and search

### Key Pages
- `/` - Home page
- `/marketplace2` - Venue marketplace with filtering
- `/details/:id` - Detailed venue page with booking functionality

### Note
The application currently uses dummy data. Backend integration will be added in future updates.
