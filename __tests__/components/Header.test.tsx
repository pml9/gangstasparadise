import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from '../../src/components/header';

// Mock the useUserData hook
const mockUseUserData = vi.fn().mockReturnValue({
  userData: {
    name: 'Test User',
    email: 'test@example.com',
    image: null,
  },
  isLoading: false,
});

vi.mock('@/lib/hooks/useUserData', () => ({
  useUserData: () => mockUseUserData(),
}));

// Mock next/navigation
const mockUsePathname = vi.fn().mockReturnValue('/');

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

describe('Header', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Setup default mock implementations
    mockUseUserData.mockReturnValue({
      userData: {
        name: 'Test User',
        email: 'test@example.com',
        image: null,
      },
      isLoading: false,
    });
    
    mockUsePathname.mockReturnValue('/');
  });

  it('renders the header with logo and navigation links', () => {
    render(<Header />);
    
    // Check if logo is rendered with proper attributes
    const logoLink = screen.getByTestId('logo-link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
    expect(logoLink).toHaveAttribute('aria-label', 'SkillBridge Home');
    
    // Check logo image
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('logo-image')).toHaveAttribute('alt', 'SkillBridge Logo');
    expect(screen.getByTestId('logo-text')).toHaveTextContent('SkillBridge');
    
    // Check navigation links
    const navs = screen.getAllByRole('navigation');
    const mainNav = navs.find(nav => 
      nav.getAttribute('aria-label') === 'Main navigation'
    );
    expect(mainNav).toBeInTheDocument();
    
    // Check navigation links using test IDs
    const homeLink = screen.getByTestId('nav-home');
    const browseLink = screen.getByTestId('nav-browse-skills');
    const sessionsLink = screen.getByTestId('nav-my-sessions');
    
    // Verify link texts and hrefs
    expect(homeLink).toHaveTextContent('Home');
    expect(homeLink).toHaveAttribute('href', '/dashboard');
    
    expect(browseLink).toHaveTextContent('Browse Skills');
    expect(browseLink).toHaveAttribute('href', '/browse');
    
    expect(sessionsLink).toHaveTextContent('My Sessions');
    expect(sessionsLink).toHaveAttribute('href', '/my-sessions');
    
    // Check profile section
    const profileSection = screen.getByTestId('profile-section');
    expect(profileSection).toBeInTheDocument();
    
    const profileLink = screen.getByTestId('profile-link');
    expect(profileLink).toHaveAttribute('href', '/profile');
    expect(profileLink).toHaveAttribute('aria-label', 'View Test User\'s profile');
    
    // Check user avatar
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toBeInTheDocument();
    expect(screen.getByTestId('user-avatar-fallback')).toHaveTextContent('T');
    expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
  });

  it('shows loading state when user data is loading', () => {
    mockUseUserData.mockReturnValue({
      userData: null,
      isLoading: true,
    });
    
    render(<Header />);
    
    // Check loading state
    const avatarFallback = screen.getByTestId('user-avatar-fallback');
    const userName = screen.getByTestId('user-name');
    
    expect(avatarFallback).toHaveTextContent('...');
    expect(userName).toHaveTextContent('Loading...');
    expect(screen.getByTestId('profile-link')).toHaveAttribute('aria-label', 'View profile');
  });

  it('highlights active navigation link', () => {
    mockUsePathname.mockReturnValue('/browse');
    
    render(<Header />);
    
    // The active link should have aria-current="page"
    const activeLink = screen.getByTestId('nav-browse-skills');
    expect(activeLink).toHaveAttribute('aria-current', 'page');
    expect(activeLink).toHaveClass('text-primary-warm-gold');
    
    // Other links should not have aria-current
    expect(screen.getByTestId('nav-home')).not.toHaveAttribute('aria-current');
    expect(screen.getByTestId('nav-my-sessions')).not.toHaveAttribute('aria-current');
  });
});
