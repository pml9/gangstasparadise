import { Asset, AssetBooking, AssetType, AssetBookingStatus } from '../src/types';

export const mockAssets: Asset[] = [
  // Vehicles
  {
    id: 1,
    name: 'Company Tesla Model 3',
    type: 'Vehicle',
    description: 'White Tesla Model 3, fully charged, ideal for client visits',
    location: 'Parking Garage Level B1, Spot 12',
    available: true,
    image_url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    created_at: '2023-08-15T10:00:00Z',
    updated_at: '2024-03-10T14:30:00Z'
  },
  {
    id: 2,
    name: 'Delivery Van - Ford Transit',
    type: 'Vehicle',
    description: 'Large cargo van for equipment transport and deliveries',
    location: 'Parking Garage Level B1, Spot 15',
    available: false,
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    created_at: '2023-09-20T12:00:00Z',
    updated_at: '2024-03-12T09:15:00Z'
  },

  // Meeting Rooms
  {
    id: 3,
    name: 'Executive Conference Room',
    type: 'Room',
    description: 'Premium conference room with 4K display, video conferencing, seats 12',
    location: 'Floor 5, Executive Wing',
    available: true,
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    created_at: '2023-06-01T08:00:00Z',
    updated_at: '2024-03-13T11:20:00Z'
  },
  {
    id: 4,
    name: 'Creative Brainstorm Room',
    type: 'Room',
    description: 'Open collaborative space with whiteboards and standing desks',
    location: 'Floor 3, Innovation Hub',
    available: true,
    image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop',
    created_at: '2023-07-10T14:30:00Z',
    updated_at: '2024-03-13T16:45:00Z'
  },
  {
    id: 5,
    name: 'Phone Booth - Quiet Room 1',
    type: 'Room',
    description: 'Private phone booth for confidential calls and video meetings',
    location: 'Floor 2, Near Reception',
    available: false,
    image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop',
    created_at: '2023-11-15T16:00:00Z',
    updated_at: '2024-03-13T15:30:00Z'
  },

  // Technology Equipment
  {
    id: 6,
    name: 'MacBook Pro 16" M3',
    type: 'Technology',
    description: 'High-performance laptop for video editing and development work',
    location: 'IT Equipment Room, Cabinet A',
    available: true,
    image_url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
    created_at: '2024-01-20T10:15:00Z',
    updated_at: '2024-03-05T09:45:00Z'
  },
  {
    id: 7,
    name: 'Professional Camera Kit',
    type: 'Equipment',
    description: 'Canon EOS R5 with lenses and lighting equipment for content creation',
    location: 'Media Equipment Room, Shelf B',
    available: true,
    image_url: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
    created_at: '2023-10-05T13:20:00Z',
    updated_at: '2024-02-28T11:10:00Z'
  },
  {
    id: 8,
    name: 'Wireless Presentation Clicker',
    type: 'Technology',
    description: 'Logitech wireless presenter with laser pointer and slide remote',
    location: 'Shared Equipment Cabinet',
    available: false,
    image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    created_at: '2023-12-08T14:45:00Z',
    updated_at: '2024-03-12T10:30:00Z'
  },

  // Furniture & Other
  {
    id: 9,
    name: 'Standing Desk - Adjustable',
    type: 'Furniture',
    description: 'Electric height-adjustable standing desk for temporary workspace',
    location: 'Hot-desking Area, Floor 2',
    available: true,
    image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    created_at: '2024-02-01T08:30:00Z',
    updated_at: '2024-03-10T15:20:00Z'
  },
  {
    id: 10,
    name: 'Portable Projector',
    type: 'Equipment',
    description: 'Compact 4K projector for presentations and client demos',
    location: 'AV Equipment Room',
    available: true,
    image_url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop',
    created_at: '2023-09-12T12:15:00Z',
    updated_at: '2024-03-08T14:00:00Z'
  }
];

export const mockAssetBookings: AssetBooking[] = [
  // Active bookings
  {
    id: 1,
    user_id: 4,
    user: {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@workhub.com'
    },
    asset_id: 3,
    asset: {
      id: 3,
      name: 'Executive Conference Room',
      type: 'Room',
      description: 'Premium conference room with 4K display, video conferencing, seats 12',
      location: 'Floor 5, Executive Wing',
      available: false,
      image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      created_at: '2023-06-01T08:00:00Z',
      updated_at: '2024-03-13T11:20:00Z'
    },
    start_date: '2024-03-14',
    end_date: '2024-03-14',
    status: 'active',
    purpose: 'Board meeting and quarterly review presentation',
    created_at: '2024-03-10T09:30:00Z',
    updated_at: '2024-03-10T09:30:00Z'
  },
  {
    id: 2,
    user_id: 7,
    user: {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@workhub.com'
    },
    asset_id: 2,
    asset: {
      id: 2,
      name: 'Delivery Van - Ford Transit',
      type: 'Vehicle',
      description: 'Large cargo van for equipment transport and deliveries',
      location: 'Parking Garage Level B1, Spot 15',
      available: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      created_at: '2023-09-20T12:00:00Z',
      updated_at: '2024-03-12T09:15:00Z'
    },
    start_date: '2024-03-13',
    end_date: '2024-03-15',
    status: 'active',
    purpose: 'Office furniture delivery to new branch location',
    created_at: '2024-03-11T14:20:00Z',
    updated_at: '2024-03-11T14:20:00Z'
  },
  {
    id: 3,
    user_id: 8,
    user: {
      id: 8,
      name: 'Rachel Kim',
      email: 'rachel.kim@workhub.com'
    },
    asset_id: 5,
    asset: {
      id: 5,
      name: 'Phone Booth - Quiet Room 1',
      type: 'Room',
      description: 'Private phone booth for confidential calls and video meetings',
      location: 'Floor 2, Near Reception',
      available: false,
      image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop',
      created_at: '2023-11-15T16:00:00Z',
      updated_at: '2024-03-13T15:30:00Z'
    },
    start_date: '2024-03-13',
    end_date: '2024-03-13',
    status: 'active',
    purpose: 'Confidential HR discussion and salary review call',
    created_at: '2024-03-13T13:45:00Z',
    updated_at: '2024-03-13T13:45:00Z'
  },
  {
    id: 4,
    user_id: 5,
    user: {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@workhub.com'
    },
    asset_id: 8,
    asset: {
      id: 8,
      name: 'Wireless Presentation Clicker',
      type: 'Technology',
      description: 'Logitech wireless presenter with laser pointer and slide remote',
      location: 'Shared Equipment Cabinet',
      available: false,
      image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      created_at: '2023-12-08T14:45:00Z',
      updated_at: '2024-03-12T10:30:00Z'
    },
    start_date: '2024-03-12',
    end_date: '2024-03-15',
    status: 'active',
    purpose: 'Technical presentation series and client demos',
    created_at: '2024-03-12T08:15:00Z',
    updated_at: '2024-03-12T08:15:00Z'
  },

  // Completed bookings
  {
    id: 5,
    user_id: 6,
    user: {
      id: 6,
      name: 'Lisa Brown',
      email: 'lisa.brown@workhub.com'
    },
    asset_id: 1,
    asset: {
      id: 1,
      name: 'Company Tesla Model 3',
      type: 'Vehicle',
      description: 'White Tesla Model 3, fully charged, ideal for client visits',
      location: 'Parking Garage Level B1, Spot 12',
      available: true,
      image_url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
      created_at: '2023-08-15T10:00:00Z',
      updated_at: '2024-03-10T14:30:00Z'
    },
    start_date: '2024-03-08',
    end_date: '2024-03-10',
    status: 'completed',
    purpose: 'Client visits in downtown area for project kickoff meetings',
    created_at: '2024-03-05T16:30:00Z',
    updated_at: '2024-03-10T17:45:00Z'
  },
  {
    id: 6,
    user_id: 9,
    user: {
      id: 9,
      name: 'Tom Anderson',
      email: 'tom.anderson@workhub.com'
    },
    asset_id: 7,
    asset: {
      id: 7,
      name: 'Professional Camera Kit',
      type: 'Equipment',
      description: 'Canon EOS R5 with lenses and lighting equipment for content creation',
      location: 'Media Equipment Room, Shelf B',
      available: true,
      image_url: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
      created_at: '2023-10-05T13:20:00Z',
      updated_at: '2024-02-28T11:10:00Z'
    },
    start_date: '2024-03-05',
    end_date: '2024-03-07',
    status: 'completed',
    purpose: 'Product photography session for new marketing materials',
    created_at: '2024-03-01T11:15:00Z',
    updated_at: '2024-03-07T16:20:00Z'
  },
  {
    id: 7,
    user_id: 4,
    user: {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@workhub.com'
    },
    asset_id: 4,
    asset: {
      id: 4,
      name: 'Creative Brainstorm Room',
      type: 'Room',
      description: 'Open collaborative space with whiteboards and standing desks',
      location: 'Floor 3, Innovation Hub',
      available: true,
      image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop',
      created_at: '2023-07-10T14:30:00Z',
      updated_at: '2024-03-13T16:45:00Z'
    },
    start_date: '2024-03-06',
    end_date: '2024-03-06',
    status: 'completed',
    purpose: 'Team brainstorming session for Q2 strategy planning',
    created_at: '2024-03-04T09:45:00Z',
    updated_at: '2024-03-06T18:30:00Z'
  },

  // Cancelled booking
  {
    id: 8,
    user_id: 7,
    user: {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@workhub.com'
    },
    asset_id: 6,
    asset: {
      id: 6,
      name: 'MacBook Pro 16" M3',
      type: 'Technology',
      description: 'High-performance laptop for video editing and development work',
      location: 'IT Equipment Room, Cabinet A',
      available: true,
      image_url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
      created_at: '2024-01-20T10:15:00Z',
      updated_at: '2024-03-05T09:45:00Z'
    },
    start_date: '2024-03-11',
    end_date: '2024-03-13',
    status: 'cancelled',
    purpose: 'Video editing project - cancelled due to client requirements change',
    created_at: '2024-03-08T14:20:00Z',
    updated_at: '2024-03-10T12:15:00Z'
  },

  // More completed bookings for history
  {
    id: 9,
    user_id: 8,
    user: {
      id: 8,
      name: 'Rachel Kim',
      email: 'rachel.kim@workhub.com'
    },
    asset_id: 10,
    asset: {
      id: 10,
      name: 'Portable Projector',
      type: 'Equipment',
      description: 'Compact 4K projector for presentations and client demos',
      location: 'AV Equipment Room',
      available: true,
      image_url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop',
      created_at: '2023-09-12T12:15:00Z',
      updated_at: '2024-03-08T14:00:00Z'
    },
    start_date: '2024-02-28',
    end_date: '2024-03-01',
    status: 'completed',
    purpose: 'Off-site client presentation and product demonstration',
    created_at: '2024-02-25T13:30:00Z',
    updated_at: '2024-03-01T17:45:00Z'
  },
  {
    id: 10,
    user_id: 5,
    user: {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@workhub.com'
    },
    asset_id: 9,
    asset: {
      id: 9,
      name: 'Standing Desk - Adjustable',
      type: 'Furniture',
      description: 'Electric height-adjustable standing desk for temporary workspace',
      location: 'Hot-desking Area, Floor 2',
      available: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      created_at: '2024-02-01T08:30:00Z',
      updated_at: '2024-03-10T15:20:00Z'
    },
    start_date: '2024-02-26',
    end_date: '2024-02-29',
    status: 'completed',
    purpose: 'Ergonomic workspace trial for back pain recovery',
    created_at: '2024-02-23T10:45:00Z',
    updated_at: '2024-02-29T16:30:00Z'
  }
];

// Helper functions for filtering and querying
export const getAssetsByType = (type: AssetType): Asset[] => {
  return mockAssets.filter(asset => asset.type === type);
};

export const getAvailableAssets = (): Asset[] => {
  return mockAssets.filter(asset => asset.available);
};

export const getAssetById = (id: number): Asset | undefined => {
  return mockAssets.find(asset => asset.id === id);
};

export const getBookingsByUserId = (userId: number): AssetBooking[] => {
  return mockAssetBookings.filter(booking => booking.user_id === userId);
};

export const getBookingsByStatus = (status: AssetBookingStatus): AssetBooking[] => {
  return mockAssetBookings.filter(booking => booking.status === status);
};

export const getBookingsByAssetId = (assetId: number): AssetBooking[] => {
  return mockAssetBookings.filter(booking => booking.asset_id === assetId);
};

export const getBookingById = (id: number): AssetBooking | undefined => {
  return mockAssetBookings.find(booking => booking.id === id);
};

export const getActiveBookings = (): AssetBooking[] => {
  return mockAssetBookings.filter(booking => booking.status === 'active');
};

export const getUpcomingBookings = (): AssetBooking[] => {
  const today = new Date().toISOString().split('T')[0];
  return mockAssetBookings.filter(booking => 
    booking.status === 'active' && booking.start_date > today
  );
};

// Check asset availability for date range
export const checkAssetAvailability = (assetId: number, startDate: string, endDate: string): boolean => {
  const conflictingBookings = mockAssetBookings.filter(booking => 
    booking.asset_id === assetId &&
    booking.status === 'active' &&
    !(endDate < booking.start_date || startDate > booking.end_date)
  );
  
  return conflictingBookings.length === 0;
};

// Generate stats for dashboard
export const getAssetStats = () => {
  const totalAssets = mockAssets.length;
  const availableAssets = mockAssets.filter(a => a.available).length;
  const activeBookings = mockAssetBookings.filter(b => b.status === 'active').length;

  // Most popular assets by booking count
  const assetBookingCounts = mockAssets.map(asset => {
    const bookingCount = mockAssetBookings.filter(b => b.asset_id === asset.id).length;
    return {
      asset,
      booking_count: bookingCount
    };
  }).sort((a, b) => b.booking_count - a.booking_count).slice(0, 3);

  return {
    total_assets: totalAssets,
    available_assets: availableAssets,
    active_bookings: activeBookings,
    most_popular_assets: assetBookingCounts
  };
};

// Asset types for quick filtering
export const assetTypes: AssetType[] = ['Vehicle', 'Equipment', 'Room', 'Technology', 'Furniture', 'Other'];

// Common booking purposes
export const commonBookingPurposes = [
  'Client meeting',
  'Team collaboration',
  'Project work',
  'Presentation',
  'Training session',
  'Content creation',
  'Business travel',
  'Equipment testing',
  'Temporary workspace',
  'Special event'
]; 