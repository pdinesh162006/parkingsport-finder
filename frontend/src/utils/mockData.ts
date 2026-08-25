import { type User, type UserRole, type ParkingSpot, type Booking, type Review, type Favorite } from '../types';

// ── Mock Users ──
export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'USER', createdAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'OWNER', createdAt: '2024-02-10' },
  { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'ADMIN', createdAt: '2024-01-01' },
  { id: '4', name: 'Bob Wilson', email: 'bob@example.com', role: 'USER', createdAt: '2024-03-05' },
  { id: '5', name: 'Alice Johnson', email: 'alice@example.com', role: 'OWNER', createdAt: '2024-02-20' },
];

// ── Mock Parking Spots ──
export const mockParkingSpots: ParkingSpot[] = [
  {
    id: '1', name: 'Downtown Central Parking', description: 'Premium covered parking in the heart of downtown. 24/7 security surveillance with EV charging stations available.',
    address: '123 Main Street, Downtown', lat: 40.7128, lng: -74.006, pricePerHour: 5.0, totalSlots: 100, availableSlots: 34,
    rating: 4.5, reviewCount: 128, images: [], ownerId: '2', ownerName: 'Jane Smith', createdAt: '2024-01-20',
  },
  {
    id: '2', name: 'Airport Long-Term Lot', description: 'Affordable long-term parking near the international airport. Free shuttle to terminals every 10 minutes.',
    address: '456 Airport Blvd, Terminal Area', lat: 40.6413, lng: -73.7781, pricePerHour: 3.5, totalSlots: 250, availableSlots: 102,
    rating: 4.2, reviewCount: 89, images: [], ownerId: '2', ownerName: 'Jane Smith', createdAt: '2024-02-01',
  },
  {
    id: '3', name: 'Mall Underground Garage', description: 'Spacious underground parking beneath the Grand Mall. Direct elevator access to all shopping floors.',
    address: '789 Shopping Ave, West Side', lat: 40.7589, lng: -73.9851, pricePerHour: 4.0, totalSlots: 180, availableSlots: 0,
    rating: 3.8, reviewCount: 56, images: [], ownerId: '5', ownerName: 'Alice Johnson', createdAt: '2024-02-15',
  },
  {
    id: '4', name: 'University Campus Parking', description: 'Open-air lot for students, faculty, and visitors. Monthly passes available at discounted rates.',
    address: '101 College Road, University District', lat: 40.7291, lng: -73.9965, pricePerHour: 2.0, totalSlots: 150, availableSlots: 67,
    rating: 4.0, reviewCount: 42, images: [], ownerId: '5', ownerName: 'Alice Johnson', createdAt: '2024-03-01',
  },
  {
    id: '5', name: 'Harbor View Parking', description: 'Scenic waterfront parking with beautiful harbor views. Walking distance to ferries and waterfront dining.',
    address: '202 Waterfront Drive, Harbor District', lat: 40.6892, lng: -74.0445, pricePerHour: 6.0, totalSlots: 80, availableSlots: 23,
    rating: 4.7, reviewCount: 201, images: [], ownerId: '2', ownerName: 'Jane Smith', createdAt: '2024-01-25',
  },
  {
    id: '6', name: 'Tech Park Garage', description: 'Modern multi-level garage in the tech hub. Features automated parking system and EV charging on every level.',
    address: '303 Innovation Blvd, Tech District', lat: 40.7484, lng: -73.9857, pricePerHour: 7.5, totalSlots: 200, availableSlots: 88,
    rating: 4.6, reviewCount: 154, images: [], ownerId: '5', ownerName: 'Alice Johnson', createdAt: '2024-03-10',
  },
];

// ── Mock Reviews ──
export const mockReviews: Review[] = [
  { id: '1', userId: '1', userName: 'John Doe', spotId: '1', rating: 5, comment: 'Excellent parking, very clean and well-lit. Security is great!', createdAt: '2024-03-15' },
  { id: '2', userId: '4', userName: 'Bob Wilson', spotId: '1', rating: 4, comment: 'Good location, a bit pricey but worth it for the convenience.', createdAt: '2024-03-20' },
  { id: '3', userId: '1', userName: 'John Doe', spotId: '2', rating: 4, comment: 'The shuttle service to the terminal is very convenient.', createdAt: '2024-03-18' },
  { id: '4', userId: '4', userName: 'Bob Wilson', spotId: '5', rating: 5, comment: 'Beautiful views and great location. Always has spots available.', createdAt: '2024-03-22' },
];

// ── Mock Bookings ──
export const mockBookings: Booking[] = [
  { id: '1', userId: '1', spotId: '1', spotName: 'Downtown Central Parking', spotAddress: '123 Main Street', startTime: '2024-04-01T09:00:00', endTime: '2024-04-01T13:00:00', totalPrice: 20.0, status: 'COMPLETED', createdAt: '2024-03-30' },
  { id: '2', userId: '1', spotId: '5', spotName: 'Harbor View Parking', spotAddress: '202 Waterfront Drive', startTime: '2024-04-10T10:00:00', endTime: '2024-04-10T14:00:00', totalPrice: 24.0, status: 'CONFIRMED', createdAt: '2024-04-08' },
  { id: '3', userId: '1', spotId: '2', spotName: 'Airport Long-Term Lot', spotAddress: '456 Airport Blvd', startTime: '2024-04-15T06:00:00', endTime: '2024-04-18T18:00:00', totalPrice: 294.0, status: 'PENDING', createdAt: '2024-04-12' },
  { id: '4', userId: '4', spotId: '1', spotName: 'Downtown Central Parking', spotAddress: '123 Main Street', startTime: '2024-04-05T08:00:00', endTime: '2024-04-05T12:00:00', totalPrice: 20.0, status: 'CANCELLED', createdAt: '2024-04-03' },
];

// ── Mock Favorites ──
export const mockFavorites: Favorite[] = [
  { id: '1', userId: '1', spotId: '1', spot: mockParkingSpots[0], createdAt: '2024-03-10' },
  { id: '2', userId: '1', spotId: '5', spot: mockParkingSpots[4], createdAt: '2024-03-12' },
  { id: '3', userId: '1', spotId: '6', spot: mockParkingSpots[5], createdAt: '2024-03-15' },
];

// ── Current mock user (simulates logged-in state) ──
export const mockCurrentUser: User = mockUsers[0]; // John Doe, USER role

export function getMockUserByRole(role: UserRole): User {
  return mockUsers.find(u => u.role === role) || mockUsers[0];
}
