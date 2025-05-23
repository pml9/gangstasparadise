import { MaintenanceIssue, Device, IssueType, MaintenanceStatus, MaintenancePriority } from '../src/types';

// Mock devices for the organization
export const mockDevices: Device[] = [
  {
    id: 1,
    serial_number: 'LT001234',
    type: 'Laptop',
    model: 'Dell XPS 13',
    location: 'Office Floor 3, Desk 15',
    purchase_date: '2023-06-15',
    warranty_expiry: '2026-06-15',
    status: 'active',
    created_at: '2023-06-15T10:00:00Z',
    updated_at: '2023-06-15T10:00:00Z'
  },
  {
    id: 2,
    serial_number: 'MN987654',
    type: 'Monitor',
    model: 'LG UltraWide 34"',
    location: 'Office Floor 2, Conference Room A',
    purchase_date: '2023-08-20',
    warranty_expiry: '2026-08-20',
    status: 'active',
    created_at: '2023-08-20T14:30:00Z',
    updated_at: '2023-08-20T14:30:00Z'
  },
  {
    id: 3,
    serial_number: 'PR456789',
    type: 'Printer',
    model: 'HP LaserJet Pro M404n',
    location: 'Office Floor 1, Main Reception',
    purchase_date: '2023-04-10',
    warranty_expiry: '2025-04-10',
    status: 'maintenance',
    created_at: '2023-04-10T09:15:00Z',
    updated_at: '2024-03-10T11:20:00Z'
  },
  {
    id: 4,
    serial_number: 'AC789012',
    type: 'HVAC Unit',
    model: 'Carrier WeatherExpert 48TC',
    location: 'Rooftop Unit 2',
    purchase_date: '2022-12-05',
    warranty_expiry: '2027-12-05',
    status: 'active',
    created_at: '2022-12-05T16:45:00Z',
    updated_at: '2022-12-05T16:45:00Z'
  },
  {
    id: 5,
    serial_number: 'KB345678',
    type: 'Keyboard',
    model: 'Logitech MX Keys',
    location: 'Office Floor 3, Desk 22',
    purchase_date: '2024-01-15',
    warranty_expiry: '2027-01-15',
    status: 'active',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z'
  }
];

export const mockMaintenanceIssues: MaintenanceIssue[] = [
  // New issues (high priority)
  {
    id: 1,
    user_id: 4,
    user: {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@workhub.com'
    },
    issue_type: 'IT Equipment',
    description: 'Laptop keyboard keys sticking, particularly the spacebar and enter key. Making typing very difficult.',
    device_serial_number: 'LT001234',
    device: {
      id: 1,
      serial_number: 'LT001234',
      type: 'Laptop',
      model: 'Dell XPS 13',
      location: 'Office Floor 3, Desk 15',
      purchase_date: '2023-06-15',
      warranty_expiry: '2026-06-15',
      status: 'active',
      created_at: '2023-06-15T10:00:00Z',
      updated_at: '2023-06-15T10:00:00Z'
    },
    status: 'new',
    assigned_to: null,
    assignee: null,
    priority: 'high',
    comments: null,
    created_at: '2024-03-13T09:15:00Z',
    updated_at: '2024-03-13T09:15:00Z'
  },
  {
    id: 2,
    user_id: 7,
    user: {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@workhub.com'
    },
    issue_type: 'HVAC',
    description: 'Conference room is extremely cold despite thermostat being set to 72°F. Team meetings are uncomfortable.',
    device_serial_number: 'AC789012',
    device: {
      id: 4,
      serial_number: 'AC789012',
      type: 'HVAC Unit',
      model: 'Carrier WeatherExpert 48TC',
      location: 'Rooftop Unit 2',
      purchase_date: '2022-12-05',
      warranty_expiry: '2027-12-05',
      status: 'active',
      created_at: '2022-12-05T16:45:00Z',
      updated_at: '2022-12-05T16:45:00Z'
    },
    status: 'new',
    assigned_to: null,
    assignee: null,
    priority: 'medium',
    comments: null,
    created_at: '2024-03-13T14:30:00Z',
    updated_at: '2024-03-13T14:30:00Z'
  },
  {
    id: 3,
    user_id: 8,
    user: {
      id: 8,
      name: 'Rachel Kim',
      email: 'rachel.kim@workhub.com'
    },
    issue_type: 'Office Equipment',
    description: 'Main printer on first floor is jamming constantly and producing faded prints. Urgent for client proposals.',
    device_serial_number: 'PR456789',
    device: {
      id: 3,
      serial_number: 'PR456789',
      type: 'Printer',
      model: 'HP LaserJet Pro M404n',
      location: 'Office Floor 1, Main Reception',
      purchase_date: '2023-04-10',
      warranty_expiry: '2025-04-10',
      status: 'maintenance',
      created_at: '2023-04-10T09:15:00Z',
      updated_at: '2024-03-10T11:20:00Z'
    },
    status: 'new',
    assigned_to: null,
    assignee: null,
    priority: 'urgent',
    comments: null,
    created_at: '2024-03-12T16:45:00Z',
    updated_at: '2024-03-12T16:45:00Z'
  },

  // In progress issues
  {
    id: 4,
    user_id: 5,
    user: {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@workhub.com'
    },
    issue_type: 'Electrical',
    description: 'Power outlet at desk 22 is not working. Need alternative power source for laptop and monitor.',
    device_serial_number: null,
    device: null,
    status: 'in_progress',
    assigned_to: 10,
    assignee: {
      id: 10,
      name: 'IT Support Team',
      email: 'support@workhub.com'
    },
    priority: 'medium',
    comments: 'Electrician scheduled for tomorrow morning. Temporary power strip provided.',
    created_at: '2024-03-11T10:20:00Z',
    updated_at: '2024-03-12T08:15:00Z'
  },
  {
    id: 5,
    user_id: 6,
    user: {
      id: 6,
      name: 'Lisa Brown',
      email: 'lisa.brown@workhub.com'
    },
    issue_type: 'IT Equipment',
    description: 'Monitor flickering intermittently, especially when connected to laptop. Display becomes unusable.',
    device_serial_number: 'MN987654',
    device: {
      id: 2,
      serial_number: 'MN987654',
      type: 'Monitor',
      model: 'LG UltraWide 34"',
      location: 'Office Floor 2, Conference Room A',
      purchase_date: '2023-08-20',
      warranty_expiry: '2026-08-20',
      status: 'active',
      created_at: '2023-08-20T14:30:00Z',
      updated_at: '2023-08-20T14:30:00Z'
    },
    status: 'in_progress',
    assigned_to: 10,
    assignee: {
      id: 10,
      name: 'IT Support Team',
      email: 'support@workhub.com'
    },
    priority: 'medium',
    comments: 'Tested cables - issue seems to be with monitor. Contacting manufacturer for warranty repair.',
    created_at: '2024-03-10T13:45:00Z',
    updated_at: '2024-03-11T09:30:00Z'
  },

  // Resolved issues
  {
    id: 6,
    user_id: 9,
    user: {
      id: 9,
      name: 'Tom Anderson',
      email: 'tom.anderson@workhub.com'
    },
    issue_type: 'Facilities',
    description: 'Water leak in men\'s restroom on 2nd floor causing puddle near sink area.',
    device_serial_number: null,
    device: null,
    status: 'resolved',
    assigned_to: 10,
    assignee: {
      id: 10,
      name: 'IT Support Team',
      email: 'support@workhub.com'
    },
    priority: 'high',
    comments: 'Plumber fixed loose pipe connection. Area cleaned and sanitized. Issue resolved.',
    created_at: '2024-03-08T15:30:00Z',
    updated_at: '2024-03-09T12:45:00Z'
  },
  {
    id: 7,
    user_id: 4,
    user: {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@workhub.com'
    },
    issue_type: 'Security',
    description: 'Key card reader at main entrance not recognizing cards consistently. Security concern.',
    device_serial_number: null,
    device: null,
    status: 'resolved',
    assigned_to: 10,
    assignee: {
      id: 10,
      name: 'IT Support Team',
      email: 'support@workhub.com'
    },
    priority: 'high',
    comments: 'Card reader sensors cleaned and calibrated. New backup reader installed. System working normally.',
    created_at: '2024-03-06T08:45:00Z',
    updated_at: '2024-03-07T14:20:00Z'
  },

  // Closed issues (older resolved)
  {
    id: 8,
    user_id: 7,
    user: {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@workhub.com'
    },
    issue_type: 'IT Equipment',
    description: 'Wireless keyboard not responding, may need new batteries or replacement.',
    device_serial_number: 'KB345678',
    device: {
      id: 5,
      serial_number: 'KB345678',
      type: 'Keyboard',
      model: 'Logitech MX Keys',
      location: 'Office Floor 3, Desk 22',
      purchase_date: '2024-01-15',
      warranty_expiry: '2027-01-15',
      status: 'active',
      created_at: '2024-01-15T08:00:00Z',
      updated_at: '2024-01-15T08:00:00Z'
    },
    status: 'closed',
    assigned_to: 10,
    assignee: {
      id: 10,
      name: 'IT Support Team',
      email: 'support@workhub.com'
    },
    priority: 'low',
    comments: 'Replaced batteries. Keyboard working normally. User satisfied with resolution.',
    created_at: '2024-02-28T11:15:00Z',
    updated_at: '2024-03-01T09:30:00Z'
  },
  {
    id: 9,
    user_id: 8,
    user: {
      id: 8,
      name: 'Rachel Kim',
      email: 'rachel.kim@workhub.com'
    },
    issue_type: 'Facilities',
    description: 'Office chair height adjustment not working properly, uncomfortable for extended work.',
    device_serial_number: null,
    device: null,
    status: 'closed',
    assigned_to: 10,
    assignee: {
      id: 10,
      name: 'IT Support Team',
      email: 'support@workhub.com'
    },
    priority: 'low',
    comments: 'Chair mechanism lubricated and adjusted. Replaced with new ergonomic chair as backup solution.',
    created_at: '2024-02-25T14:20:00Z',
    updated_at: '2024-02-26T16:45:00Z'
  },
  {
    id: 10,
    user_id: 5,
    user: {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@workhub.com'
    },
    issue_type: 'HVAC',
    description: 'Air conditioning too loud in open workspace area, affecting concentration during calls.',
    device_serial_number: 'AC789012',
    device: {
      id: 4,
      serial_number: 'AC789012',
      type: 'HVAC Unit',
      model: 'Carrier WeatherExpert 48TC',
      location: 'Rooftop Unit 2',
      purchase_date: '2022-12-05',
      warranty_expiry: '2027-12-05',
      status: 'active',
      created_at: '2022-12-05T16:45:00Z',
      updated_at: '2022-12-05T16:45:00Z'
    },
    status: 'closed',
    assigned_to: 10,
    assignee: {
      id: 10,
      name: 'IT Support Team',
      email: 'support@workhub.com'
    },
    priority: 'medium',
    comments: 'HVAC technician serviced unit, cleaned filters and adjusted fan speed. Noise level significantly reduced.',
    created_at: '2024-02-20T09:30:00Z',
    updated_at: '2024-02-22T13:15:00Z'
  }
];

// Helper functions for filtering and querying
export const getMaintenanceByUserId = (userId: number): MaintenanceIssue[] => {
  return mockMaintenanceIssues.filter(issue => issue.user_id === userId);
};

export const getMaintenanceByStatus = (status: MaintenanceStatus): MaintenanceIssue[] => {
  return mockMaintenanceIssues.filter(issue => issue.status === status);
};

export const getMaintenanceByPriority = (priority: MaintenancePriority): MaintenanceIssue[] => {
  return mockMaintenanceIssues.filter(issue => issue.priority === priority);
};

export const getMaintenanceByIssueType = (issueType: IssueType): MaintenanceIssue[] => {
  return mockMaintenanceIssues.filter(issue => issue.issue_type === issueType);
};

export const getMaintenanceById = (id: number): MaintenanceIssue | undefined => {
  return mockMaintenanceIssues.find(issue => issue.id === id);
};

export const getDeviceById = (id: number): Device | undefined => {
  return mockDevices.find(device => device.id === id);
};

export const getDeviceBySerialNumber = (serialNumber: string): Device | undefined => {
  return mockDevices.find(device => device.serial_number === serialNumber);
};

export const getDevicesByType = (type: string): Device[] => {
  return mockDevices.filter(device => device.type === type);
};

export const getDevicesByStatus = (status: 'active' | 'inactive' | 'maintenance' | 'disposed'): Device[] => {
  return mockDevices.filter(device => device.status === status);
};

// Generate stats for dashboard
export const getMaintenanceStats = () => {
  const total = mockMaintenanceIssues.length;
  const newIssues = mockMaintenanceIssues.filter(i => i.status === 'new').length;
  const inProgress = mockMaintenanceIssues.filter(i => i.status === 'in_progress').length;
  const resolved = mockMaintenanceIssues.filter(i => i.status === 'resolved').length;

  // Calculate average resolution time (mock calculation)
  const resolvedIssues = mockMaintenanceIssues.filter(i => i.status === 'resolved' || i.status === 'closed');
  const avgResolutionTime = resolvedIssues.length > 0 ? 2.5 : 0; // Mock average of 2.5 days

  const issuesByPriority = {
    low: mockMaintenanceIssues.filter(i => i.priority === 'low').length,
    medium: mockMaintenanceIssues.filter(i => i.priority === 'medium').length,
    high: mockMaintenanceIssues.filter(i => i.priority === 'high').length,
    urgent: mockMaintenanceIssues.filter(i => i.priority === 'urgent').length,
  };

  return {
    total_issues: total,
    new_issues: newIssues,
    in_progress_issues: inProgress,
    resolved_issues: resolved,
    avg_resolution_time: avgResolutionTime,
    issues_by_priority: issuesByPriority
  };
};

// Auto-assignment logic for new issues
export const getAssigneeForIssueType = (issueType: IssueType): number => {
  // For demo purposes, all issues are assigned to IT Support Team (id: 10)
  // In a real system, this would route to specific teams based on issue type
  const assignmentRules: Record<IssueType, number> = {
    'IT Equipment': 10,
    'Office Equipment': 10,
    'HVAC': 10,
    'Plumbing': 10,
    'Electrical': 10,
    'Facilities': 10,
    'Security': 10,
    'Other': 10
  };

  return assignmentRules[issueType] || 10;
}; 