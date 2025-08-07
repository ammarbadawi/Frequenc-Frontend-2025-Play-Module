# FrequenC Play - Microservices Architecture

## Overview

This document provides a comprehensive overview of the FrequenC Play microservices architecture, designed to support a sports platform with venue booking, game creation, payment processing, and social features.

## Architecture Principles

### Domain-Driven Design (DDD)
- **Bounded Contexts**: Clear service boundaries based on business domains
- **Ubiquitous Language**: Consistent terminology across services
- **Aggregate Roots**: Well-defined data ownership and consistency boundaries

### Microservices Patterns
- **API Gateway**: Single entry point with routing and authentication
- **Event-Driven Communication**: Asynchronous messaging with NATS
- **Database per Service**: Each service owns its data
- **Circuit Breaker**: Fault tolerance and resilience

## Service Architecture

### 1. API Gateway Service
**Port**: 3000
**Purpose**: Main entry point, request routing, authentication, rate limiting

**Key Responsibilities**:
- Request routing to appropriate microservices
- Authentication and authorization
- Rate limiting and throttling
- Request/response transformation
- API documentation (Swagger)
- CORS and security headers

**Endpoints**:
```
/auth/*          -> Auth Service
/users/*         -> Users Service
/venues/*        -> Venues Service
/bookings/*      -> Bookings Service
/games/*         -> Games Service
/payments/*      -> Payments Service
/notifications/* -> Notifications Service
/marketplace/*   -> Marketplace Service
```

### 2. Auth Service
**Port**: 3001 (internal)
**Purpose**: User authentication, authorization, JWT management

**Key Responsibilities**:
- User registration and login
- JWT token generation and validation
- Password reset and email verification
- Token refresh and logout
- User profile retrieval

**Message Patterns**:
```
auth.register
auth.login
auth.refresh
auth.logout
auth.forgot-password
auth.reset-password
auth.verify-email
auth.get-profile
auth.validate-token
```

### 3. Users Service
**Port**: 3002 (internal)
**Purpose**: User profile management, social features, friend management

**Key Responsibilities**:
- User profile CRUD operations
- Friend requests and management
- User search and discovery
- Profile image upload
- User statistics and achievements

**Message Patterns**:
```
users.get-profile
users.update-profile
users.upload-avatar
users.search
users.get-friends
users.send-friend-request
users.accept-friend-request
```
### 4. Venues Service
**Port**: 3003 (internal)
**Purpose**: Sports venues and court management

**Key Responsibilities**:
- Venue CRUD operations
- Court management
- Venue search and filtering
- Image upload and gallery management
- Reviews and ratings
- Availability checking

**Message Patterns**:
```
venues.get-all
venues.get-by-id
venues.create
venues.update
venues.delete
venues.search
venues.get-courts
venues.add-court
venues.get-availability
venues.upload-image
venues.get-reviews
venues.add-review
```

### 5. Bookings Service
**Port**: 3004 (internal)
**Purpose**: Court booking and reservation system

**Key Responsibilities**:
- Booking creation and management
- Time slot availability
- Booking confirmation and cancellation
- Conflict detection
- Booking history

**Message Patterns**:
```
bookings.get-user-bookings
bookings.create
bookings.update
bookings.cancel
bookings.get-time-slots
bookings.check-availability
bookings.confirm
```

### 6. Games Service
**Port**: 3005 (internal)
**Purpose**: Game creation and player management

**Key Responsibilities**:
- Game creation and management
- Player invitation and joining
- Game status management
- Participant management
- Game discovery

**Message Patterns**:
```
games.get-available
games.create
games.join
games.leave
games.get-participants
games.update-status
games.invite-players
```

### 7. Payments Service
**Port**: 3006 (internal)
**Purpose**: Payment processing and cart management

**Key Responsibilities**:
- Payment processing with Stripe
- Cart management
- Coupon and discount handling
- Payment history
- Refund processing

**Message Patterns**:
```
payments.process
payments.get-history
payments.refund
cart.get-items
cart.add-item
cart.update-item
cart.remove-item
cart.apply-coupon
```

### 8. Notifications Service
**Port**: 3007 (internal)
**Purpose**: Real-time notifications and messaging

**Key Responsibilities**:
- Email notifications
- Push notifications
- In-app notifications
- Notification preferences
- Message templates

**Message Patterns**:
```
notifications.send-email
notifications.send-push
notifications.create
notifications.get-user-notifications
notifications.mark-read
notifications.update-preferences
```

### 9. Marketplace Service
**Port**: 3008 (internal)
**Purpose**: Equipment and services marketplace

**Key Responsibilities**:
- Product catalog management
- Order processing
- Inventory management
- Product reviews
- Vendor management

**Message Patterns**:
```
marketplace.get-products
marketplace.get-product
marketplace.create-order
marketplace.get-orders
marketplace.add-review
```

## Data Architecture

### Database Design
Each service has its own database schema with the following models:

#### Auth Service Database
```sql
users (
  id, email, password, name, phone, location, bio,
  skill_level, avatar_url, role, email_verified,
  verification_token, reset_token, reset_token_expiry,
  created_at, updated_at
)
```

#### Users Service Database
```sql
users (
  id, name, email, phone, location, bio, skill_level,
  avatar_url, role, created_at, updated_at
)

friendships (
  id, user_id, friend_id, status, created_at, updated_at
)

favorites (
  id, user_id, type, item_id, created_at
)
```

#### Venues Service Database
```sql
venues (
  id, name, address, latitude, longitude, description,
  phone, email, image_url, gallery, amenities,
  opening_time, closing_time, rating, review_count,
  owner_id, created_at, updated_at
)

courts (
  id, name, sport_type, surface, type, hourly_rate,
  is_available, description, images, venue_id,
  created_at, updated_at
)

reviews (
  id, rating, comment, venue_id, user_id,
  created_at, updated_at
)
```

#### Bookings Service Database
```sql
bookings (
  id, court_id, user_id, date, start_time, end_time,
  duration, total_price, status, game_type, notes,
  player_ids, is_public, created_at, updated_at
)

time_slots (
  id, time, available, price, court_id, date,
  booking_id, created_at, updated_at
)
```

#### Games Service Database
```sql
games (
  id, booking_id, title, description, max_players,
  current_players, is_public, skill_level, status,
  created_at, updated_at
)

game_participants (
  id, game_id, user_id, role, joined_at
)
```

#### Payments Service Database
```sql
payments (
  id, amount, currency, booking_id, user_id, status,
  payment_method, description, payment_intent_id,
  payment_method_id, created_at, updated_at
)

cart_items (
  id, user_id, name, venue, date, time, price,
  quantity, image, type, brand, created_at, updated_at
)
```

#### Notifications Service Database
```sql
notifications (
  id, user_id, type, title, message, data, is_read,
  created_at, updated_at
)
```

## Communication Patterns

### Synchronous Communication
- **HTTP/REST**: Direct service-to-service calls
- **gRPC**: High-performance internal communication
- **Load Balancing**: Round-robin and health-based routing

### Asynchronous Communication
- **NATS**: Message broker for event-driven communication
- **Event Sourcing**: Audit trail and event replay
- **CQRS**: Command Query Responsibility Segregation

### Real-time Communication
- **WebSocket**: Live updates and notifications
- **Server-Sent Events**: Real-time data streaming
- **Socket.IO**: Cross-platform real-time communication

## Security Architecture

### Authentication
- **JWT Tokens**: Stateless authentication
- **Refresh Tokens**: Secure token renewal
- **OAuth 2.0**: Third-party authentication
- **Multi-factor Authentication**: Enhanced security

### Authorization
- **Role-Based Access Control (RBAC)**: User role management
- **Resource-Based Permissions**: Fine-grained access control
- **API Key Management**: Service-to-service authentication

### Data Protection
- **Encryption at Rest**: Database encryption
- **Encryption in Transit**: TLS/SSL communication
- **Data Masking**: Sensitive data protection
- **Audit Logging**: Security event tracking

## Scalability & Performance

### Horizontal Scaling
- **Service Replication**: Multiple instances per service
- **Load Balancing**: Traffic distribution
- **Auto-scaling**: Dynamic resource allocation
- **Database Sharding**: Data distribution

### Performance Optimization
- **Caching**: Redis for frequently accessed data
- **CDN**: Static content delivery
- **Database Indexing**: Query optimization
- **Connection Pooling**: Database connection management

### Monitoring & Observability
- **Metrics Collection**: Performance monitoring
- **Distributed Tracing**: Request flow tracking
- **Log Aggregation**: Centralized logging
- **Health Checks**: Service availability monitoring

## Deployment Architecture

### Container Orchestration
- **Docker**: Containerization
- **Kubernetes**: Container orchestration
- **Helm Charts**: Deployment automation
- **Service Mesh**: Inter-service communication

### Infrastructure
- **Cloud Provider**: AWS/Azure/GCP
- **Load Balancer**: Traffic distribution
- **Auto Scaling Groups**: Dynamic scaling
- **VPC**: Network isolation

### CI/CD Pipeline
- **GitHub Actions**: Automated workflows
- **Docker Registry**: Image storage
- **Helm Repository**: Chart management
- **Monitoring**: Deployment verification

## Development Workflow

### Local Development
1. **Service Isolation**: Independent service development
2. **Hot Reloading**: Fast development iteration
3. **Mock Services**: Dependency simulation
4. **Database Seeding**: Test data management

### Testing Strategy
- **Unit Tests**: Service-level testing
- **Integration Tests**: Service interaction testing
- **E2E Tests**: Full system testing
- **Performance Tests**: Load and stress testing

### Code Quality
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Code Reviews**: Quality assurance

## Future Enhancements

### Planned Features
- **GraphQL**: Flexible data querying
- **Event Sourcing**: Complete audit trail
- **CQRS**: Performance optimization
- **Micro Frontends**: Frontend modularity

### Technology Upgrades
- **Service Mesh**: Advanced networking
- **Serverless**: Event-driven scaling
- **Edge Computing**: Reduced latency
- **AI/ML Integration**: Smart recommendations

## Conclusion

This microservices architecture provides a scalable, maintainable, and robust foundation for the FrequenC Play platform. The design follows industry best practices and enables rapid development and deployment of new features while maintaining high availability and performance. 