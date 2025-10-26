import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminSidebar from '../src/adminDashboard/components/AdminSidebar';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('AdminSidebar Component', () => {
  const mockSetSidebarOpen = vi.fn();
  const mockHandleLogout = vi.fn();

  const defaultProps = {
    sidebarOpen: true,
    setSidebarOpen: mockSetSidebarOpen,
    userPhone: '1234567890',
    handleLogout: mockHandleLogout,
  };

  it('should render the logo, menu items, and user info', () => {
    renderWithRouter(<AdminSidebar {...defaultProps} />);

    expect(screen.getByText('Campaign')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Admin User')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should call setSidebarOpen(false) when the close button is clicked', () => {
    renderWithRouter(<AdminSidebar {...defaultProps} />);

    const closeButton = screen.getByLabelText('Close sidebar');
    fireEvent.click(closeButton);
    expect(mockSetSidebarOpen).toHaveBeenCalledWith(false);
  });

  it('should navigate to the correct path and close sidebar on menu item click', () => {
    const { getByText } = renderWithRouter(<AdminSidebar {...defaultProps} />, { route: '/dashboard' });

    const usersLink = getByText('Users').closest('button');
    fireEvent.click(usersLink);

    expect(mockSetSidebarOpen).toHaveBeenCalledWith(false);
    // We can't directly test navigation with this setup, 
    // but we can test that the active link has changed.
    expect(usersLink).toHaveAttribute('aria-current', 'page');
  });

  it('should highlight the active menu item with aria-current', () => {
    renderWithRouter(<AdminSidebar {...defaultProps} />, { route: '/admin/users' });

    const usersLink = screen.getByRole('button', { name: /Users/i });
    expect(usersLink).toHaveAttribute('aria-current', 'page');

    const dashboardLink = screen.getByRole('button', { name: /Dashboard/i });
    expect(dashboardLink).not.toHaveAttribute('aria-current', 'page');
  });

  it('should call handleLogout when the logout button is clicked', () => {
    renderWithRouter(<AdminSidebar {...defaultProps} />);

    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    fireEvent.click(logoutButton);
    expect(mockHandleLogout).toHaveBeenCalledTimes(1);
  });

  it('should display a default initial if userPhone is not provided', () => {
    const propsWithoutPhone = { ...defaultProps, userPhone: null };
    renderWithRouter(<AdminSidebar {...propsWithoutPhone} />);

    expect(screen.getByText('U')).toBeInTheDocument();
  });
});