import { AgeGroup } from '@/types/common';

export const onboardingSteps = [
  {
    id: 'welcome',
    title: 'Welcome to Intergenerational Skill Exchange',
    description: 'Let\'s get you set up in just a few steps.',
    fields: []
  },
  {
    id: 'age-verification',
    title: 'Age Verification',
    description: 'Please confirm you are 18 years or older.',
    fields: [
      {
        name: 'isOver18',
        type: 'checkbox',
        label: 'I confirm I am 18 years or older',
        required: true,
        validation: {
          required: 'You must be 18 or older to use this platform'
        }
      }
    ]
  },
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Tell us a bit about yourself.',
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
        validation: {
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters long'
          }
        }
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'your.email@example.com',
        required: true,
        validation: {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        }
      },
      {
        name: 'ageGroup',
        type: 'select',
        label: 'Age Group',
        options: [
          { value: AgeGroup.YOUNG_LEARNERS, label: 'Young Learners (16-29)' },
          { value: AgeGroup.ESTABLISHED_ADULTS, label: 'Established Adults (30-49)' },
          { value: AgeGroup.EXPERIENCED_GUIDES, label: 'Experienced Guides (50-64)' },
          { value: AgeGroup.WISDOM_KEEPERS, label: 'Wisdom Keepers (65+)' }
        ],
        required: true,
        validation: {
          required: 'Please select your age group'
        }
      }
    ]
  },
  {
    id: 'location',
    title: 'Your Location',
    description: 'Help us find skill exchanges near you.',
    fields: [
      {
        name: 'location',
        type: 'location',
        label: 'Your Location',
        placeholder: 'Enter your address or city',
        required: true,
        validation: {
          required: 'Location is required for finding nearby skill exchanges'
        }
      },
      {
        name: 'searchRadius',
        type: 'slider',
        label: 'Search Radius',
        min: 5,
        max: 100,
        step: 5,
        unit: 'km',
        defaultValue: 20,
        required: true
      }
    ]
  },
  {
    id: 'skills',
    title: 'Your Skills',
    description: 'What skills would you like to teach and learn?',
    fields: [
      {
        name: 'teachingSkills',
        type: 'multiselect',
        label: 'I can teach',
        placeholder: 'Select skills you can teach',
        options: [
          { value: 'skill-1', label: 'JavaScript Programming' },
          { value: 'skill-2', label: 'Cooking' },
          { value: 'skill-3', label: 'Yoga' },
          { value: 'skill-4', label: 'Spanish Language' },
          { value: 'skill-5', label: 'Woodworking' },
          { value: 'skill-6', label: 'Digital Marketing' },
          { value: 'skill-7', label: 'Photography' },
          { value: 'skill-8', label: 'Financial Planning' }
        ],
        required: false,
        maxSelections: 5
      },
      {
        name: 'learningSkills',
        type: 'multiselect',
        label: 'I want to learn',
        placeholder: 'Select skills you want to learn',
        options: [
          { value: 'skill-9', label: 'Guitar' },
          { value: 'skill-10', label: 'Gardening' },
          { value: 'skill-11', label: 'Graphic Design' },
          { value: 'skill-12', label: 'Public Speaking' },
          { value: 'skill-13', label: 'Data Analysis' },
          { value: 'skill-14', label: 'Knitting' },
          { value: 'skill-15', label: 'Meditation' },
          { value: 'skill-16', label: 'Car Maintenance' }
        ],
        required: true,
        validation: {
          required: 'Please select at least one skill you want to learn'
        },
        maxSelections: 5
      }
    ]
  },
  {
    id: 'availability',
    title: 'Your Availability',
    description: 'When are you typically available for skill exchanges?',
    fields: [
      {
        name: 'availability',
        type: 'schedule',
        label: 'Weekly Schedule',
        days: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ],
        timeRanges: [
          'Morning (8am-12pm)',
          'Afternoon (12pm-5pm)',
          'Evening (5pm-9pm)',
          'Weekends'
        ],
        required: true,
        validation: {
          required: 'Please select your availability'
        }
      },
      {
        name: 'preferredFormat',
        type: 'radio',
        label: 'Preferred Session Format',
        options: [
          { value: 'IN_PERSON', label: 'In-person' },
          { value: 'VIRTUAL', label: 'Virtual' },
          { value: 'BOTH', label: 'Both' }
        ],
        required: true,
        defaultValue: 'BOTH',
        validation: {
          required: 'Please select your preferred session format'
        }
      }
    ]
  },
  {
    id: 'profile',
    title: 'Complete Your Profile',
    description: 'Add a photo and tell others about yourself.',
    fields: [
      {
        name: 'avatar',
        type: 'file',
        label: 'Profile Photo',
        accept: 'image/*',
        required: false,
        description: 'Upload a clear photo of yourself (optional)'
      },
      {
        name: 'bio',
        type: 'textarea',
        label: 'About Me',
        placeholder: 'Tell others about yourself, your background, and what you\'re passionate about',
        rows: 4,
        required: true,
        validation: {
          required: 'Please tell us about yourself',
          minLength: {
            value: 20,
            message: 'Please write at least 20 characters about yourself'
          },
          maxLength: {
            value: 500,
            message: 'Bio must be less than 500 characters'
          }
        }
      },
      {
        name: 'motivation',
        type: 'textarea',
        label: 'Why do you want to join our community?',
        placeholder: 'Share what motivates you to exchange skills across generations',
        rows: 3,
        required: false
      },
      {
        name: 'contactPreferences',
        type: 'checkbox-group',
        label: 'Contact Preferences',
        options: [
          { value: 'email', label: 'Email me about new skill exchange opportunities' },
          { value: 'notifications', label: 'Send me app notifications' },
          { value: 'newsletter', label: 'Subscribe to our monthly newsletter' }
        ],
        required: false,
        defaultValue: ['email', 'notifications']
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy Settings',
    description: 'Control how your information is shared on the platform.',
    fields: [
      {
        name: 'profileVisibility',
        type: 'radio',
        label: 'Profile Visibility',
        options: [
          { 
            value: 'PUBLIC', 
            label: 'Public',
            description: 'Anyone can see your profile and skills'
          },
          { 
            value: 'COMMUNITY', 
            label: 'Community Only',
            description: 'Only registered users can see your profile',
            default: true
          },
          { 
            value: 'PRIVATE', 
            label: 'Private',
            description: 'Only you can see your profile'
          }
        ],
        required: true
      },
      {
        name: 'shareContactInfo',
        type: 'checkbox',
        label: 'Allow other users to see my contact information',
        description: 'Your email and phone number will be visible to users you connect with',
        required: false,
        defaultValue: false
      },
      {
        name: 'termsAccepted',
        type: 'checkbox',
        label: 'I accept the Terms of Service and Privacy Policy',
        required: true,
        validation: {
          required: 'You must accept the terms and conditions to continue'
        }
      }
    ]
  },
  {
    id: 'complete',
    title: 'Setup Complete!',
    description: 'You\'re all set to start your intergenerational skill exchange journey!',
    fields: []
  }
];

export const onboardingProgress = {
  currentStep: 0,
  completedSteps: [],
  totalSteps: onboardingSteps.length
};

export const mockOnboardingData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  ageGroup: AgeGroup.ESTABLISHED_ADULTS,
  location: {
    address: '123 Main St, Berlin, Germany',
    lat: 52.52,
    lng: 13.405
  },
  searchRadius: 20,
  teachingSkills: ['skill-1', 'skill-3'],
  learningSkills: ['skill-4', 'skill-5'],
  availability: {
    monday: ['afternoon', 'evening'],
    wednesday: ['afternoon'],
    saturday: ['morning']
  },
  preferredFormat: 'BOTH',
  bio: 'Passionate about technology and teaching. Love to learn new skills and share my knowledge with others.',
  motivation: 'I believe in lifelong learning and want to connect with people from different generations to exchange knowledge and experiences.',
  profileVisibility: 'COMMUNITY',
  termsAccepted: true
};
