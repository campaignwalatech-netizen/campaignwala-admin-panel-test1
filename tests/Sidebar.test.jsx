import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../src/adminDashboard/components/Sidebar';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe('Sidebar Component', () => {
  it('should render the logo and main menu items', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText('Campaignwala')).toBeInTheDocument();
    expect(screen.getByText('Manage Account')).toBeInTheDocument();
    expect(screen.getByText('Payment Withdrawal List')).toBeInTheDocument();
  });

  it('should toggle a submenu on click', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Sidebar />);

    const manageAccountMenu = screen.getByRole('button', { name: /Manage Account/i });

    // Submenu should be hidden initially
    expect(screen.queryByText('All Offers')).not.toBeInTheDocument();

    // Open submenu
    await user.click(manageAccountMenu);
    expect(screen.getByText('All Offers')).toBeInTheDocument();
    expect(screen.getByText('Add Offers')).toBeInTheDocument();

    // Close submenu
    await user.click(manageAccountMenu);
    expect(screen.queryByText('All Offers')).not.toBeInTheDocument();
  });

  it('should highlight the active link for direct navigation', () => {
    renderWithRouter(<Sidebar />, { route: '/admin/payment-withdrawal' });
    const paymentLink = screen.getByRole('link', { name: /Payment Withdrawal List/i });
    expect(paymentLink).toHaveClass('bg-sidebar-accent');
  });

  it('should highlight the active submenu link and auto-expand the parent', () => {
    renderWithRouter(<Sidebar />, { route: '/admin/add-category' });

    // Parent menu should be expanded
    const submenuLink = screen.getByRole('link', { name: /Add Category/i });
    expect(submenuLink).toBeInTheDocument();
    expect(submenuLink).toHaveClass('bg-sidebar-accent');
  });

  it('should toggle the sidebar on small screens', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Sidebar />);
    const toggleButton = screen.getByLabelText('Toggle menu');

    // Can't test the transform, but can test the button icon changes
    expect(toggleButton.innerHTML).toContain('menu'); // Assuming lucide icon name

    await user.click(toggleButton);
    expect(toggleButton.innerHTML).toContain('x'); // Should now be the close icon
  });

  it('should close the sidebar when a link is clicked on small screens', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Sidebar />);
    const toggleButton = screen.getByLabelText('Toggle menu');

    // Open the menu
    await user.click(toggleButton);
    expect(toggleButton.innerHTML).toContain('x');

    // Click a link
    const paymentLink = screen.getByRole('link', { name: /Payment Withdrawal List/i });
    await user.click(paymentLink);

    // Menu should close
    expect(toggleButton.innerHTML).toContain('menu');
  });
});
