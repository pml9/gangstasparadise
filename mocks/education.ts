import { EducationActivity, EducationEnrollment, EducationActivityType, EducationActivityStatus, EnrollmentStatus } from '../src/types';

export const mockEducationActivities: EducationActivity[] = [
  // Open training activities
  {
    id: 1,
    title: 'Advanced JavaScript Fundamentals',
    description: 'Deep dive into modern JavaScript concepts including ES6+, async/await, and advanced patterns for frontend and backend development.',
    type: 'training',
    instructor: 'Sarah Tech, Senior Frontend Engineer',
    location: 'Training Room A, Floor 4',
    start_date: '2024-04-15T09:00:00Z',
    end_date: '2024-04-15T17:00:00Z',
    capacity: 20,
    enrolled_count: 12,
    cost_per_person: 150.00,
    status: 'open',
    organizer_id: 1,
    organizer: {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@workhub.com'
    },
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-13T14:30:00Z'
  },
  {
    id: 2,
    title: 'Cloud Architecture Workshop',
    description: 'Hands-on workshop covering AWS services, microservices architecture, and best practices for scalable cloud solutions.',
    type: 'workshop',
    instructor: 'Mike Cloud, AWS Solutions Architect',
    location: 'Innovation Lab, Floor 3',
    start_date: '2024-04-22T10:00:00Z',
    end_date: '2024-04-23T16:00:00Z',
    capacity: 15,
    enrolled_count: 8,
    cost_per_person: 300.00,
    status: 'open',
    organizer_id: 2,
    organizer: {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@workhub.com'
    },
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    created_at: '2024-03-05T09:15:00Z',
    updated_at: '2024-03-12T11:45:00Z'
  },
  {
    id: 3,
    title: 'Design Thinking & UX Research',
    description: 'Learn user-centered design principles, research methodologies, and prototyping techniques for better product development.',
    type: 'seminar',
    instructor: 'Lisa Design, UX Research Lead',
    location: 'Creative Studio, Floor 2',
    start_date: '2024-04-10T13:00:00Z',
    end_date: '2024-04-10T17:00:00Z',
    capacity: 25,
    enrolled_count: 18,
    cost_per_person: 100.00,
    status: 'open',
    organizer_id: 1,
    organizer: {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@workhub.com'
    },
    image_url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop',
    created_at: '2024-03-08T14:20:00Z',
    updated_at: '2024-03-13T16:10:00Z'
  },

  // Team building activities
  {
    id: 4,
    title: 'Quarterly Team Building: Escape Room Challenge',
    description: 'Fun team building activity to improve collaboration and problem-solving skills through interactive escape room challenges.',
    type: 'team_building',
    instructor: null,
    location: 'Escape Quest Downtown (Off-site)',
    start_date: '2024-04-05T14:00:00Z',
    end_date: '2024-04-05T18:00:00Z',
    capacity: 30,
    enrolled_count: 24,
    cost_per_person: 45.00,
    status: 'open',
    organizer_id: 3,
    organizer: {
      id: 3,
      name: 'Alex Rodriguez',
      email: 'admin@workhub.com'
    },
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    created_at: '2024-02-28T11:30:00Z',
    updated_at: '2024-03-13T13:15:00Z'
  },

  // Social activities
  {
    id: 5,
    title: 'Monthly Tech Talk: AI & Machine Learning Trends',
    description: 'Informal presentation and discussion about latest developments in AI/ML with industry guest speakers.',
    type: 'social',
    instructor: 'Various Industry Experts',
    location: 'Main Auditorium, Floor 1',
    start_date: '2024-03-28T17:30:00Z',
    end_date: '2024-03-28T19:30:00Z',
    capacity: 50,
    enrolled_count: 35,
    cost_per_person: null,
    status: 'open',
    organizer_id: 2,
    organizer: {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@workhub.com'
    },
    image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    created_at: '2024-03-10T08:45:00Z',
    updated_at: '2024-03-13T17:20:00Z'
  },

  // Completed activities
  {
    id: 6,
    title: 'Agile Project Management Certification',
    description: 'Comprehensive training on Agile methodologies, Scrum framework, and project management best practices.',
    type: 'training',
    instructor: 'John Agile, Certified Scrum Master',
    location: 'Conference Room B, Floor 5',
    start_date: '2024-03-08T09:00:00Z',
    end_date: '2024-03-09T17:00:00Z',
    capacity: 16,
    enrolled_count: 14,
    cost_per_person: 400.00,
    status: 'completed',
    organizer_id: 1,
    organizer: {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@workhub.com'
    },
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    created_at: '2024-02-15T12:00:00Z',
    updated_at: '2024-03-09T18:30:00Z'
  },
  {
    id: 7,
    title: 'Cybersecurity Awareness Workshop',
    description: 'Essential cybersecurity training covering phishing, password security, and safe computing practices.',
    type: 'workshop',
    instructor: 'Security Team',
    location: 'Training Room C, Floor 4',
    start_date: '2024-02-28T10:00:00Z',
    end_date: '2024-02-28T15:00:00Z',
    capacity: 40,
    enrolled_count: 38,
    cost_per_person: null,
    status: 'completed',
    organizer_id: 3,
    organizer: {
      id: 3,
      name: 'Alex Rodriguez',
      email: 'admin@workhub.com'
    },
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
    created_at: '2024-02-01T09:30:00Z',
    updated_at: '2024-02-28T16:45:00Z'
  },

  // Closed/cancelled activities
  {
    id: 8,
    title: 'Advanced React Native Development',
    description: 'Mobile app development workshop focusing on React Native for iOS and Android applications.',
    type: 'workshop',
    instructor: 'Mobile Dev Expert',
    location: 'Development Lab, Floor 3',
    start_date: '2024-04-18T09:00:00Z',
    end_date: '2024-04-19T17:00:00Z',
    capacity: 12,
    enrolled_count: 5,
    cost_per_person: 250.00,
    status: 'cancelled',
    organizer_id: 2,
    organizer: {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@workhub.com'
    },
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    created_at: '2024-03-07T15:45:00Z',
    updated_at: '2024-03-12T14:20:00Z'
  },
  {
    id: 9,
    title: 'Leadership Skills Development',
    description: 'Management training focused on leadership techniques, team motivation, and effective communication.',
    type: 'training',
    instructor: 'Leadership Coach Pro',
    location: 'Executive Training Room, Floor 5',
    start_date: '2024-04-25T09:00:00Z',
    end_date: '2024-04-26T16:00:00Z',
    capacity: 10,
    enrolled_count: 10,
    cost_per_person: 500.00,
    status: 'closed',
    organizer_id: 1,
    organizer: {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@workhub.com'
    },
    image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
    created_at: '2024-03-03T10:15:00Z',
    updated_at: '2024-03-11T16:30:00Z'
  },
  {
    id: 10,
    title: 'Company Pizza & Game Night',
    description: 'Casual social event with pizza, board games, and networking opportunities for all team members.',
    type: 'social',
    instructor: null,
    location: 'Main Break Room & Recreation Area',
    start_date: '2024-03-22T18:00:00Z',
    end_date: '2024-03-22T22:00:00Z',
    capacity: 60,
    enrolled_count: 45,
    cost_per_person: null,
    status: 'completed',
    organizer_id: 3,
    organizer: {
      id: 3,
      name: 'Alex Rodriguez',
      email: 'admin@workhub.com'
    },
    image_url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop',
    created_at: '2024-03-15T12:30:00Z',
    updated_at: '2024-03-22T23:15:00Z'
  }
];

export const mockEducationEnrollments: EducationEnrollment[] = [
  // Current enrollments for upcoming activities
  {
    id: 1,
    user_id: 4,
    user: {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@workhub.com'
    },
    activity_id: 1,
    activity: mockEducationActivities[0], // Advanced JavaScript Fundamentals
    status: 'enrolled',
    enrollment_date: '2024-03-10T14:20:00Z',
    attendance_status: null,
    completion_certificate: null,
    feedback_rating: null,
    feedback_comments: null,
    created_at: '2024-03-10T14:20:00Z',
    updated_at: '2024-03-10T14:20:00Z'
  },
  {
    id: 2,
    user_id: 7,
    user: {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@workhub.com'
    },
    activity_id: 2,
    activity: mockEducationActivities[1], // Cloud Architecture Workshop
    status: 'enrolled',
    enrollment_date: '2024-03-08T11:45:00Z',
    attendance_status: null,
    completion_certificate: null,
    feedback_rating: null,
    feedback_comments: null,
    created_at: '2024-03-08T11:45:00Z',
    updated_at: '2024-03-08T11:45:00Z'
  },
  {
    id: 3,
    user_id: 8,
    user: {
      id: 8,
      name: 'Rachel Kim',
      email: 'rachel.kim@workhub.com'
    },
    activity_id: 3,
    activity: mockEducationActivities[2], // Design Thinking & UX Research
    status: 'enrolled',
    enrollment_date: '2024-03-09T16:30:00Z',
    attendance_status: null,
    completion_certificate: null,
    feedback_rating: null,
    feedback_comments: null,
    created_at: '2024-03-09T16:30:00Z',
    updated_at: '2024-03-09T16:30:00Z'
  },
  {
    id: 4,
    user_id: 5,
    user: {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@workhub.com'
    },
    activity_id: 4,
    activity: mockEducationActivities[3], // Team Building Escape Room
    status: 'enrolled',
    enrollment_date: '2024-03-12T09:15:00Z',
    attendance_status: null,
    completion_certificate: null,
    feedback_rating: null,
    feedback_comments: null,
    created_at: '2024-03-12T09:15:00Z',
    updated_at: '2024-03-12T09:15:00Z'
  },
  {
    id: 5,
    user_id: 6,
    user: {
      id: 6,
      name: 'Lisa Brown',
      email: 'lisa.brown@workhub.com'
    },
    activity_id: 5,
    activity: mockEducationActivities[4], // Tech Talk
    status: 'enrolled',
    enrollment_date: '2024-03-11T13:20:00Z',
    attendance_status: null,
    completion_certificate: null,
    feedback_rating: null,
    feedback_comments: null,
    created_at: '2024-03-11T13:20:00Z',
    updated_at: '2024-03-11T13:20:00Z'
  },

  // Completed enrollments with feedback
  {
    id: 6,
    user_id: 4,
    user: {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@workhub.com'
    },
    activity_id: 6,
    activity: mockEducationActivities[5], // Agile Project Management
    status: 'attended',
    enrollment_date: '2024-02-20T10:30:00Z',
    attendance_status: 'attended',
    completion_certificate: 'https://certificates.workhub.com/agile-pm-emily-davis-2024.pdf',
    feedback_rating: 5,
    feedback_comments: 'Excellent training! Very practical and well-structured. The instructor was knowledgeable and engaging.',
    created_at: '2024-02-20T10:30:00Z',
    updated_at: '2024-03-09T19:45:00Z'
  },
  {
    id: 7,
    user_id: 7,
    user: {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@workhub.com'
    },
    activity_id: 6,
    activity: mockEducationActivities[5], // Agile Project Management
    status: 'attended',
    enrollment_date: '2024-02-18T14:15:00Z',
    attendance_status: 'attended',
    completion_certificate: 'https://certificates.workhub.com/agile-pm-david-martinez-2024.pdf',
    feedback_rating: 4,
    feedback_comments: 'Good content but could use more hands-on exercises. Overall valuable for project management skills.',
    created_at: '2024-02-18T14:15:00Z',
    updated_at: '2024-03-09T20:10:00Z'
  },
  {
    id: 8,
    user_id: 8,
    user: {
      id: 8,
      name: 'Rachel Kim',
      email: 'rachel.kim@workhub.com'
    },
    activity_id: 7,
    activity: mockEducationActivities[6], // Cybersecurity Awareness
    status: 'attended',
    enrollment_date: '2024-02-25T11:45:00Z',
    attendance_status: 'attended',
    completion_certificate: null,
    feedback_rating: 4,
    feedback_comments: 'Very important topics covered. Made me much more aware of security risks and best practices.',
    created_at: '2024-02-25T11:45:00Z',
    updated_at: '2024-02-28T17:30:00Z'
  },

  // Missed attendance
  {
    id: 9,
    user_id: 9,
    user: {
      id: 9,
      name: 'Tom Anderson',
      email: 'tom.anderson@workhub.com'
    },
    activity_id: 6,
    activity: mockEducationActivities[5], // Agile Project Management
    status: 'enrolled',
    enrollment_date: '2024-02-22T15:30:00Z',
    attendance_status: 'missed',
    completion_certificate: null,
    feedback_rating: null,
    feedback_comments: 'Unable to attend due to client emergency. Would like to attend next session.',
    created_at: '2024-02-22T15:30:00Z',
    updated_at: '2024-03-09T21:00:00Z'
  },

  // Cancelled enrollment
  {
    id: 10,
    user_id: 5,
    user: {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@workhub.com'
    },
    activity_id: 8,
    activity: mockEducationActivities[7], // React Native (cancelled activity)
    status: 'cancelled',
    enrollment_date: '2024-03-08T12:20:00Z',
    attendance_status: null,
    completion_certificate: null,
    feedback_rating: null,
    feedback_comments: null,
    created_at: '2024-03-08T12:20:00Z',
    updated_at: '2024-03-12T14:25:00Z'
  }
];

// Helper functions for filtering and querying
export const getActivitiesByType = (type: EducationActivityType): EducationActivity[] => {
  return mockEducationActivities.filter(activity => activity.type === type);
};

export const getActivitiesByStatus = (status: EducationActivityStatus): EducationActivity[] => {
  return mockEducationActivities.filter(activity => activity.status === status);
};

export const getActivityById = (id: number): EducationActivity | undefined => {
  return mockEducationActivities.find(activity => activity.id === id);
};

export const getEnrollmentsByUserId = (userId: number): EducationEnrollment[] => {
  return mockEducationEnrollments.filter(enrollment => enrollment.user_id === userId);
};

export const getEnrollmentsByActivityId = (activityId: number): EducationEnrollment[] => {
  return mockEducationEnrollments.filter(enrollment => enrollment.activity_id === activityId);
};

export const getEnrollmentsByStatus = (status: EnrollmentStatus): EducationEnrollment[] => {
  return mockEducationEnrollments.filter(enrollment => enrollment.status === status);
};

export const getEnrollmentById = (id: number): EducationEnrollment | undefined => {
  return mockEducationEnrollments.find(enrollment => enrollment.id === id);
};

export const getUpcomingActivities = (): EducationActivity[] => {
  const now = new Date().toISOString();
  return mockEducationActivities.filter(activity => 
    activity.status === 'open' && activity.start_date > now
  );
};

export const getMyEnrollments = (userId: number): EducationEnrollment[] => {
  return mockEducationEnrollments.filter(enrollment => 
    enrollment.user_id === userId && 
    enrollment.status === 'enrolled'
  );
};

export const getCompletedActivitiesWithCertificates = (userId: number): EducationEnrollment[] => {
  return mockEducationEnrollments.filter(enrollment => 
    enrollment.user_id === userId && 
    enrollment.attendance_status === 'attended' && 
    enrollment.completion_certificate
  );
};

// Generate stats for dashboard
export const getEducationStats = () => {
  const totalActivities = mockEducationActivities.length;
  const upcomingActivities = getUpcomingActivities().length;
  const myEnrollmentsCount = mockEducationEnrollments.filter(e => e.status === 'enrolled').length;
  
  // Calculate completion rate
  const attendedEnrollments = mockEducationEnrollments.filter(e => e.attendance_status === 'attended').length;
  const totalCompletedActivities = mockEducationEnrollments.filter(e => 
    e.attendance_status === 'attended' || e.attendance_status === 'missed'
  ).length;
  const completionRate = totalCompletedActivities > 0 ? (attendedEnrollments / totalCompletedActivities) * 100 : 0;

  // Popular activities by enrollment count
  const popularActivities = mockEducationActivities
    .map(activity => ({
      activity,
      enrollment_count: mockEducationEnrollments.filter(e => e.activity_id === activity.id).length
    }))
    .sort((a, b) => b.enrollment_count - a.enrollment_count)
    .slice(0, 3);

  // Calculate learning hours (mock calculation)
  const learningHours = mockEducationEnrollments
    .filter(e => e.attendance_status === 'attended')
    .reduce((total, enrollment) => {
      const activity = enrollment.activity;
      if (activity) {
        const start = new Date(activity.start_date);
        const end = new Date(activity.end_date);
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        return total + hours;
      }
      return total;
    }, 0);

  return {
    total_activities: totalActivities,
    upcoming_activities: upcomingActivities,
    my_enrollments: myEnrollmentsCount,
    completion_rate: Math.round(completionRate),
    popular_activities: popularActivities,
    learning_hours_completed: Math.round(learningHours)
  };
};

// Activity types for filtering
export const activityTypes: EducationActivityType[] = ['training', 'workshop', 'seminar', 'social', 'team_building'];

// Common training topics
export const commonTrainingTopics = [
  'Technical Skills',
  'Project Management',
  'Leadership Development',
  'Communication Skills',
  'Cybersecurity',
  'Design & UX',
  'Data Analysis',
  'Marketing & Sales',
  'Team Building',
  'Professional Development'
]; 