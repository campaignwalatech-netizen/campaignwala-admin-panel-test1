import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProfileMenu from '../src/adminDashboard/components/ProfileMenu';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => (store[key] = value.toString()),
    removeItem: (key) => delete store[key],
    clear: () => (store = {}),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('ProfileMenu Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('should toggle the menu on button click', async () => {
    const user = userEvent.setup();
    render(<ProfileMenu />, { wrapper: MemoryRouter });

    const menuButton = screen.getByLabelText('Profile menu');
    
    // Menu should be closed initially
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();

    // Open menu
    await user.click(menuButton);
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();

    // Close menu
    await user.click(menuButton);
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should close the menu when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <div data-testid="outside">Outside Element</div>
        <ProfileMenu />
      </div>,
      { wrapper: MemoryRouter }
    );

    // Open menu first
    await user.click(screen.getByLabelText('Profile menu'));
    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Click outside
    await user.click(screen.getByTestId('outside'));
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should call handleLogout and navigate on logout button click', async () => {
    const user = userEvent.setup();
    localStorageMock.setItem('isLoggedIn', 'true');
    render(<ProfileMenu />, { wrapper: MemoryRouter });

    // Open menu
    await user.click(screen.getByLabelText('Profile menu'));

    // Click logout
    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    await user.click(logoutButton);

    // Assertions
    expect(localStorageMock.getItem('isLoggedIn')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(screen.queryByText('Logout')).not.toBeInTheDocument(); // Menu should close
  });

  it('should render user info in the menu', async () => {
    const user = userEvent.setup();
    render(<ProfileMenu />, { wrapper: MemoryRouter });

    await user.click(screen.getByLabelText('Profile menu'));

    expect(screen.getByText('Admin User')).toBeInTheDocument();
    expect(screen.getByText('admin@freelancer.com')).toBeInTheDocument();
  });
});
