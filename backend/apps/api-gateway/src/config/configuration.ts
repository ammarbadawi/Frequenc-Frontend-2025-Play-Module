export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  nats: {
    url: process.env.NATS_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL, 10) || 60,
    limit: parseInt(process.env.THROTTLE_LIMIT, 10) || 100,
  },
  services: {
    auth: {
      name: 'AUTH_SERVICE',
      queue: 'auth_queue',
    },
    users: {
      name: 'USERS_SERVICE',
      queue: 'users_queue',
    },
    venues: {
      name: 'VENUES_SERVICE',
      queue: 'venues_queue',
    },
    bookings: {
      name: 'BOOKINGS_SERVICE',
      queue: 'bookings_queue',
    },
    games: {
      name: 'GAMES_SERVICE',
      queue: 'games_queue',
    },
    payments: {
      name: 'PAYMENTS_SERVICE',
      queue: 'payments_queue',
    },
    notifications: {
      name: 'NOTIFICATIONS_SERVICE',
      queue: 'notifications_queue',
    },
    marketplace: {
      name: 'MARKETPLACE_SERVICE',
      queue: 'marketplace_queue',
    },
  },
}); 