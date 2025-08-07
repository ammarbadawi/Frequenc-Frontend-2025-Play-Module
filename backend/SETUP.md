# 🚀 FrequenC Backend Setup Guide

## 📋 Prerequisites

- Node.js 18+ 
- Docker & Docker Compose
- MongoDB (via Docker)
- Redis (via Docker)
- NATS (via Docker)

## 🛠️ Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
cd libs/shared && npm install && npm run build
cd ../..
```

### 2. Environment Configuration
```bash
cp env.example .env
# Edit .env with your configuration
```

### 3. Start Infrastructure
```bash
docker-compose up -d mongo redis nats
```

### 4. Database Setup
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 5. Start Services
```bash
# Start API Gateway
npm run start:gateway

# Start other services as needed
npm run start:auth
npm run start:users
npm run start:venues
npm run start:bookings
npm run start:games
npm run start:payments
npm run start:notifications
npm run start:marketplace
```

## 🔧 Alternative: One-Command Setup
```bash
npm run setup
```

## 📊 Service Architecture

### Core Services
- **API Gateway** (Port 3001) - Central routing and documentation
- **Auth Service** - Authentication and JWT management
- **Users Service** - User profiles and social features
- **Venues Service** - Venue and court management
- **Bookings Service** - Booking creation and management
- **Games Service** - Game creation and participation
- **Payments Service** - Cart and payment processing
- **Notifications Service** - Email and push notifications
- **Marketplace Service** - Product catalog and orders

### Infrastructure
- **MongoDB** (Port 27017) - Main database
- **Redis** (Port 6379) - Caching and sessions
- **NATS** (Port 4222) - Message broker

## 🔍 API Documentation

Once the API Gateway is running:
- **Swagger UI**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

## 🧪 Testing

### Database Seeding
The seed script creates:
- Admin user: `admin@frequenc.com` / `admin123`
- Test user: `user@frequenc.com` / `user123`
- Sample venues and courts
- Sample products

### API Testing
```bash
# Test health endpoint
curl http://localhost:3001/health

# Test authentication
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@frequenc.com","password":"user123"}'
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Check if ports 3001, 27017, 6379, 4222 are available
2. **Database connection**: Ensure MongoDB container is running
3. **NATS connection**: Ensure NATS container is running
4. **Build errors**: Run `npm run build:shared` first

### Reset Everything
```bash
npm run db:reset
docker-compose down
docker-compose up -d mongo redis nats
npm run db:push
npm run db:seed
```

## 📁 Project Structure

```
backend/
├── apps/
│   ├── api-gateway/          # Main API Gateway
│   ├── auth-service/         # Authentication
│   ├── users-service/        # User management
│   ├── venues-service/       # Venue management
│   ├── bookings-service/     # Booking system
│   ├── games-service/        # Game management
│   ├── payments-service/     # Payment processing
│   ├── notifications-service/ # Notifications
│   └── marketplace-service/  # Product catalog
├── libs/
│   └── shared/              # Shared DTOs and services
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.ts             # Database seeding
│   └── migrations/         # Database migrations
├── docker-compose.yml       # Infrastructure setup
└── package.json            # Dependencies and scripts
```

## 🚀 Development Workflow

1. **Start infrastructure**: `docker-compose up -d`
2. **Start API Gateway**: `npm run start:gateway`
3. **Start specific services**: `npm run start:auth`
4. **Make changes** and see hot reload
5. **Test endpoints** via Swagger UI

## 📝 Environment Variables

Key variables in `.env`:
- `DATABASE_URL` - MongoDB connection
- `REDIS_URL` - Redis connection
- `NATS_URL` - NATS connection
- `JWT_SECRET` - JWT signing secret
- `PORT` - API Gateway port (default: 3001)

## 🎯 Next Steps

1. **Frontend Integration** - Connect React frontend
2. **Payment Integration** - Add Stripe/PayPal
3. **Email Service** - Add SendGrid/Nodemailer
4. **File Upload** - Add AWS S3
5. **Push Notifications** - Add Firebase
6. **Testing** - Add unit and integration tests
7. **Monitoring** - Add Prometheus/Grafana
8. **Deployment** - Add CI/CD pipeline

## 📞 Support

For issues or questions:
1. Check the logs: `docker-compose logs`
2. Reset database: `npm run db:reset`
3. Check health endpoints
4. Review Swagger documentation 