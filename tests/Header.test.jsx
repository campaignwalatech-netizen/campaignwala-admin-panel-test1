import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from '../src/adminDashboard/components/Header';

// Mock the ProfileMenu component as its functionality is not the focus of these tests
vi.mock('../src/adminDashboard/components/ProfileMenu', () => ({
  default: () => <div data-testid="profile-menu">Profile Menu</div>,
}));

const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe('Header Component', () => {
  const mockOnThemeToggle = vi.fn();

  it('should render the default title on the root path', () => {
    renderWithRouter(<Header isDark={false} onThemeToggle={mockOnThemeToggle} />, { route: '/admin' });
    expect(screen.getByRole('heading', { name: /ALL Offers/i })).toBeInTheDocument();
  });

  it('should render a dynamic title based on the path', () => {
    renderWithRouter(<Header isDark={false} onThemeToggle={mockOnThemeToggle} />, { route: '/admin/users' });
    expect(screen.getByRole('heading', { name: /USERS/i })).toBeInTheDocument();
  });

  it('should render a formatted title for multi-word paths', () => {
    renderWithRouter(<Header isDark={false} onThemeToggle={mockOnThemeToggle} />, { route: '/admin/some-page' });
    expect(screen.getByRole('heading', { name: /SOME PAGE/i })).toBeInTheDocument();
  });

  it('should call onThemeToggle when the theme button is clicked', () => {
    renderWithRouter(<Header isDark={false} onThemeToggle={mockOnThemeToggle} />);
    const themeButton = screen.getByLabelText('Toggle theme');
    fireEvent.click(themeButton);
    expect(mockOnThemeToggle).toHaveBeenCalledTimes(1);
  });

  it('should display the Moon icon in light mode', () => {
    renderWithRouter(<Header isDark={false} onThemeToggle={mockOnThemeToggle} />);
    expect(screen.getByLabelText('Toggle theme').querySelector('svg').innerHTML).toContain('moon');
  });

  it('should display the Sun icon in dark mode', () => {
    renderWithRouter(<Header isDark={true} onThemeToggle={mockOnThemeToggle} />);
    expect(screen.getByLabelText('Toggle theme').querySelector('svg').innerHTML).toContain('sun');
  });

  it('should render the ProfileMenu component', () => {
    renderWithRouter(<Header isDark={false} onThemeToggle={mockOnThemeToggle} />);
    expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
  });
});
