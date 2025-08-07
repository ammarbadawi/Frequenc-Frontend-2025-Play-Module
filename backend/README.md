# FrequenC Play - NestJS Microservices Backend

A comprehensive microservices architecture built with NestJS to support the FrequenC Play sports platform frontend.

## 🏗️ Architecture Overview

This backend is built using a microservices architecture with the following services:

### Core Services
- **API Gateway** - Main entry point, request routing, and authentication
- **Auth Service** - User authentication, authorization, and JWT management
- **Users Service** - User profile management and social features
- **Venues Service** - Sports venues and court management
- **Bookings Service** - Court booking and reservation system
- **Games Service** - Game creation and player management
- **Payments Service** - Payment processing and cart management
- **Notifications Service** - Real-time notifications and messaging
- **Marketplace Service** - Equipment and services marketplace

### Infrastructure
- **PostgreSQL** - Primary database
- **Redis** - Caching and session management
- **NATS** - Message broker for inter-service communication
- **WebSocket Gateway** - Real-time communication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- PostgreSQL 15+
- Redis 7+
- NATS 2.9+

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Create environment files:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/frequenc"

# Redis
REDIS_URL="redis://localhost:6379"

# NATS
NATS_URL="nats://localhost:4222"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Email (for notifications)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-email-password"

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="frequenc-uploads"

# Stripe (for payments)
STRIPE_SECRET_KEY="sk_test_your_stripe_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

### Running with Docker

1. Build and start all services:
```bash
docker-compose up -d
```

2. Run database migrations:
```bash
npm run migrate:deploy
```

3. Seed the database (optional):
```bash
npm run db:seed
```

### Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start infrastructure services:
```bash
docker-compose up -d postgres redis nats
```

3. Run database migrations:
```bash
npm run migrate:deploy
```

4. Start services in development mode:
```bash
# Start API Gateway
npm run start:dev --prefix apps/api-gateway

# Start Auth Service
npm run start:dev --prefix apps/auth-service

# Start other services...
```

## 📚 API Documentation

Once the API Gateway is running, you can access the Swagger documentation at:
- **Development**: http://localhost:3000/api
- **Production**: https://your-domain.com/api

### Key Endpoints

#### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout
- `POST /auth/forgot-password` - Send password reset email
- `POST /auth/reset-password` - Reset password with token

#### Venues
- `GET /venues` - Get all venues with filters
- `GET /venues/:id` - Get venue details
- `POST /venues` - Create new venue
- `PUT /venues/:id` - Update venue
- `GET /venues/search` - Search venues
- `GET /venues/:id/availability` - Get venue availability

#### Bookings
- `GET /bookings` - Get user bookings
- `POST /bookings` - Create new booking
- `PUT /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Cancel booking
- `GET /bookings/:id/time-slots` - Get available time slots

#### Games
- `GET /games` - Get available games
- `POST /games` - Create new game
- `POST /games/:id/join` - Join a game
- `DELETE /games/:id/leave` - Leave a game
- `GET /games/:id/participants` - Get game participants

#### Payments
- `GET /payments` - Get payment history
- `POST /payments` - Process payment
- `GET /cart` - Get user cart
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:id` - Update cart item
- `DELETE /cart/items/:id` - Remove item from cart

#### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/friends` - Get user friends
- `POST /users/friends` - Send friend request
- `PUT /users/friends/:id` - Accept/reject friend request

## 🏛️ Domain-Driven Design

The backend follows Domain-Driven Design principles with clear service boundaries:

### Bounded Contexts
1. **Identity & Access Management** - Auth Service
2. **User Management** - Users Service
3. **Venue Management** - Venues Service
4. **Booking Management** - Bookings Service
5. **Game Management** - Games Service
6. **Payment Management** - Payments Service
7. **Communication** - Notifications Service
8. **Marketplace** - Marketplace Service

### Service Communication
- **Synchronous**: HTTP/REST for direct service-to-service calls
- **Asynchronous**: NATS messaging for event-driven communication
- **Real-time**: WebSocket connections for live updates

## 🔐 Security

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Token refresh mechanism
- Password hashing with bcrypt

### API Security
- Rate limiting with Throttler
- CORS configuration
- Helmet for security headers
- Input validation with class-validator
- SQL injection prevention with Prisma

### Data Protection
- Environment variable management
- Secure password storage
- Token blacklisting (optional)
- Audit logging

## 📊 Database Design

### Key Features
- **Normalized Schema**: Proper relationships and constraints
- **Soft Deletes**: Data preservation for analytics
- **Audit Trails**: Created/updated timestamps
- **Indexing**: Optimized for common queries
- **Migrations**: Version-controlled schema changes

### Models Overview
- **Users**: Authentication, profiles, preferences
- **Venues**: Sports facilities and courts
- **Bookings**: Reservations and scheduling
- **Games**: Match creation and participation
- **Payments**: Transaction processing
- **Reviews**: User feedback and ratings
- **Notifications**: Communication system
- **Friendships**: Social connections

## 🧪 Testing

### Test Structure
```
test/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/           # End-to-end tests
└── fixtures/      # Test data
```

### Running Tests
```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:cov
```

## 🚀 Deployment

### Production Setup
1. **Environment Configuration**
   - Set production environment variables
   - Configure SSL certificates
   - Set up monitoring and logging

2. **Database Migration**
   ```bash
   npm run migrate:deploy
   ```

3. **Docker Deployment**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

4. **Health Checks**
   - Monitor service health endpoints
   - Set up alerting for failures
   - Configure auto-scaling

### CI/CD Pipeline
- **Build**: Docker image creation
- **Test**: Automated testing suite
- **Deploy**: Blue-green deployment
- **Monitor**: Health checks and metrics

## 📈 Monitoring & Observability

### Metrics
- Service response times
- Error rates and types
- Database query performance
- Message queue throughput

### Logging
- Structured logging with Winston
- Request/response correlation
- Error tracking and alerting
- Audit trail maintenance

### Health Checks
- Service health endpoints
- Database connectivity
- External service dependencies
- Resource utilization

## 🔧 Development

### Code Style
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Consistent naming conventions

### Git Workflow
- Feature branch development
- Pull request reviews
- Semantic versioning
- Automated testing

### Local Development
- Hot reloading
- Debug configuration
- Database seeding
- Mock services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API specs
- Contact the development team

## 🔄 Changelog

### Version 1.0.0
- Initial microservices architecture
- Complete API implementation
- Database schema design
- Authentication system
- Payment integration
- Real-time notifications 