import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@frequenc.com' },
    update: {},
    create: {
      email: 'admin@frequenc.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      skillLevel: 'ADVANCED',
    },
  });

  // Create test user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@frequenc.com' },
    update: {},
    create: {
      email: 'user@frequenc.com',
      password: userPassword,
      name: 'Test User',
      role: 'PLAYER',
      skillLevel: 'INTERMEDIATE',
    },
  });

  // Create sample venues
  const venue1 = await prisma.venue.create({
    data: {
      name: 'Tennis Pro Center',
      description: 'Professional tennis facility with multiple courts',
      address: '123 Tennis Court, Sports City',
      latitude: 40.7128,
      longitude: -74.0060,
      phone: '+1234567890',
      email: 'info@tennispro.com',
      imageUrl: 'https://example.com/venue1.jpg',
      gallery: ['https://example.com/venue1-1.jpg', 'https://example.com/venue1-2.jpg'],
      openingTime: '06:00',
      closingTime: '22:00',
      amenities: ['Parking', 'Showers', 'Pro Shop', 'Café'],
      ownerId: admin.id,
    },
  });

  const venue2 = await prisma.venue.create({
    data: {
      name: 'Basketball Arena',
      description: 'Indoor basketball courts for all skill levels',
      address: '456 Basketball St, Sports City',
      latitude: 40.7589,
      longitude: -73.9851,
      phone: '+1234567891',
      email: 'info@basketballarena.com',
      imageUrl: 'https://example.com/venue2.jpg',
      gallery: ['https://example.com/venue2-1.jpg', 'https://example.com/venue2-2.jpg'],
      openingTime: '08:00',
      closingTime: '23:00',
      amenities: ['Parking', 'Locker Rooms', 'Equipment Rental', 'Snack Bar'],
      ownerId: admin.id,
    },
  });

  // Create courts for venues
  const court1 = await prisma.court.create({
    data: {
      venueId: venue1.id,
      name: 'Court 1',
      sportType: 'TENNIS',
      surface: 'HARD',
      type: 'OUTDOOR',
      hourlyRate: 50,
      isAvailable: true,
      description: 'Professional tennis court with excellent lighting',
      images: ['https://example.com/court1-1.jpg', 'https://example.com/court1-2.jpg'],
    },
  });

  const court2 = await prisma.court.create({
    data: {
      venueId: venue1.id,
      name: 'Court 2',
      sportType: 'TENNIS',
      surface: 'CLAY',
      type: 'OUTDOOR',
      hourlyRate: 60,
      isAvailable: true,
      description: 'Clay court for advanced players',
      images: ['https://example.com/court2-1.jpg', 'https://example.com/court2-2.jpg'],
    },
  });

  const court3 = await prisma.court.create({
    data: {
      venueId: venue2.id,
      name: 'Court A',
      sportType: 'BASKETBALL',
      surface: 'CONCRETE',
      type: 'INDOOR',
      hourlyRate: 40,
      isAvailable: true,
      description: 'Indoor basketball court with professional hoops',
      images: ['https://example.com/court3-1.jpg', 'https://example.com/court3-2.jpg'],
    },
  });

  // Create sample reviews
  await prisma.review.create({
    data: {
      venueId: venue1.id,
      userId: user.id,
      rating: 5,
      comment: 'Excellent tennis courts! Well maintained and great atmosphere.',
    },
  });

  await prisma.review.create({
    data: {
      venueId: venue2.id,
      userId: user.id,
      rating: 4,
      comment: 'Great basketball facility. Courts are clean and well-lit.',
    },
  });

  // Create sample products for marketplace
  await prisma.product.create({
    data: {
      name: 'Professional Tennis Racket',
      description: 'High-quality tennis racket for advanced players',
      price: 199.99,
      category: 'TENNIS',
      stock: 10,
      images: ['https://example.com/racket1.jpg'],
    },
  });

  await prisma.product.create({
    data: {
      name: 'Basketball',
      description: 'Official size basketball for indoor/outdoor use',
      price: 29.99,
      category: 'BASKETBALL',
      stock: 25,
      images: ['https://example.com/basketball1.jpg'],
    },
  });

  console.log('✅ Database seeding completed!');
  console.log(`👤 Created admin user: ${admin.email}`);
  console.log(`👤 Created test user: ${user.email}`);
  console.log(`🏟️ Created venues: ${venue1.name}, ${venue2.name}`);
  console.log(`🏸 Created courts: ${court1.name}, ${court2.name}, ${court3.name}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 