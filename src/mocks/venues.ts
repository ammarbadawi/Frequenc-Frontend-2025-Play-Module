// @ts-nocheck

export const mockVenues = [
  {
    id: "v1",
    name: "Sunrise Sports Club",
    address: "123 Main St, New York, NY",
    latitude: 40.7128,
    longitude: -74.006,
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: "123 Main St, New York, NY",
    },
    description: "A modern sports club with premium outdoor and indoor courts.",
    rating: 4.7,
    reviewCount: 128,
    imageUrl: "https://picsum.photos/seed/venue1/800/400",
    gallery: [
      "https://picsum.photos/seed/venue1/800/400",
      "https://picsum.photos/seed/venue1a/400/300",
      "https://picsum.photos/seed/venue1b/400/300",
      "https://picsum.photos/seed/venue1c/400/300",
      "https://picsum.photos/seed/venue1d/400/300",
    ],
    images: [
      "https://picsum.photos/seed/venue1/800/400",
      "https://picsum.photos/seed/venue1a/400/300",
      "https://picsum.photos/seed/venue1b/400/300",
      "https://picsum.photos/seed/venue1c/400/300",
      "https://picsum.photos/seed/venue1d/400/300",
    ],
    amenities: [
      { icon: "/images/check.svg", title: "Parking" },
      { icon: "/images/check.svg", title: "Showers" },
      { icon: "/images/check.svg", title: "Café" },
      { icon: "/images/check.svg", title: "Pro Shop" },
    ],
    reviews: [
      {
        name: "John Doe",
        rating: 5,
        comment: "Fantastic courts and friendly staff!",
      },
      { name: "Jane Smith", rating: 4, comment: "Great experience overall." },
    ],
  },
  {
    id: "v2",
    name: "Lakeside Tennis Center",
    address: "45 Lake Ave, Chicago, IL",
    latitude: 41.8781,
    longitude: -87.6298,
    location: {
      lat: 41.8781,
      lng: -87.6298,
      address: "45 Lake Ave, Chicago, IL",
    },
    description:
      "Beautiful lakeside tennis facility with clay and hard courts.",
    rating: 4.5,
    reviewCount: 76,
    imageUrl: "https://picsum.photos/seed/venue2/800/400",
    gallery: [
      "https://picsum.photos/seed/venue2/800/400",
      "https://picsum.photos/seed/venue2a/400/300",
      "https://picsum.photos/seed/venue2b/400/300",
    ],
    images: [
      "https://picsum.photos/seed/venue2/800/400",
      "https://picsum.photos/seed/venue2a/400/300",
      "https://picsum.photos/seed/venue2b/400/300",
    ],
    amenities: [
      { icon: "/images/check.svg", title: "Locker Rooms" },
      { icon: "/images/check.svg", title: "Equipment Rental" },
    ],
    reviews: [
      {
        name: "Alex P",
        rating: 5,
        comment: "Amazing view and well-kept courts.",
      },
    ],
  },
  {
    id: "v3",
    name: "City Arena",
    address: "200 Downtown Blvd, Austin, TX",
    latitude: 30.2672,
    longitude: -97.7431,
    location: {
      lat: 30.2672,
      lng: -97.7431,
      address: "200 Downtown Blvd, Austin, TX",
    },
    description: "Indoor arena suitable for multiple sports and events.",
    rating: 4.2,
    reviewCount: 45,
    imageUrl: "https://picsum.photos/seed/venue3/800/400",
    gallery: ["https://picsum.photos/seed/venue3/800/400"],
    images: ["https://picsum.photos/seed/venue3/800/400"],
    amenities: [
      { icon: "/images/check.svg", title: "Parking" },
      { icon: "/images/check.svg", title: "Snack Bar" },
    ],
    reviews: [
      {
        name: "Mike",
        rating: 4,
        comment: "Convenient location and good lighting.",
      },
    ],
  },
];

export const getMockVenueById = (id: string) =>
  mockVenues.find((v) => v.id === id);
