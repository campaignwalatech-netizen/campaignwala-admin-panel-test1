import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UsersTable from '../src/adminDashboard/forms/UsersTable';
import userService from '../src/services/userService';

// Mock the userService
vi.mock('../src/services/userService', () => ({
    default: {
        getAllUsersWithStats: vi.fn(),
        toggleUserStatus: vi.fn(),
        markUserAsEx: vi.fn(),
    }
}));

const mockUsers = [
  {
    id: '1',
    joinedOn: '2024-10-20',
    name: 'John Doe',
    phone: '1234567890',
    email: 'john.doe@example.com',
    status: 'Active',
    totalLeads: 40,
    approved: 30,
    rejected: 5,
    completed: 25,
    pending: 5,
    totalEarnings: '5000',
    totalBalance: '1000',
    isActive: true,
    isEx: false,
  },
  {
    id: '2',
    joinedOn: '2024-10-21',
    name: 'Jane Smith',
    phone: '0987654321',
    email: 'jane.smith@example.com',
    status: 'Active',
    totalLeads: 20,
    approved: 15,
    rejected: 2,
    completed: 10,
    pending: 3,
    totalEarnings: '3000',
    totalBalance: '500',
    isActive: true,
    isEx: false,
  },
];

describe('UsersTable Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    userService.getAllUsersWithStats.mockResolvedValue({ success: true, data: { users: mockUsers, pagination: { total: 2 } } });
  });

  it('should render the table with users', async () => {
    render(<UsersTable userType="active" />);

    expect(screen.getByText('Active Users')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('should filter users based on search term', async () => {
    render(<UsersTable userType="active" />);

    const searchInput = screen.getByPlaceholderText('Search users...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    await waitFor(() => {
        expect(userService.getAllUsersWithStats).toHaveBeenCalled();
    });
  });

  it('should filter users by leads', async () => {
    render(<UsersTable userType="active" />);

    const filterSelect = screen.getByRole('combobox');
    fireEvent.change(filterSelect, { target: { value: 'high_leads' } });

    await waitFor(() => {
        expect(userService.getAllUsersWithStats).toHaveBeenCalled();
    });
  });

  it('should open the view modal when "View" is clicked', async () => {
    render(<UsersTable userType="active" />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const viewButtons = screen.getAllByText('View');
    fireEvent.click(viewButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('View User Details')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });
  });

  it('should open the edit modal when "Edit" is clicked', async () => {
    render(<UsersTable userType="active" />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Edit User')).toBeInTheDocument();
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    });
  });

  it('should change user status to Hold', async () => {
    userService.toggleUserStatus.mockResolvedValue({ success: true });
    render(<UsersTable userType="active" />);

    await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const statusCell = screen.getAllByText('Active')[0];
    fireEvent.mouseEnter(statusCell);

    const holdButton = await screen.findByText('Hold');
    fireEvent.click(holdButton);

    await waitFor(() => {
        expect(userService.toggleUserStatus).toHaveBeenCalledWith('1');
    });
  });
});
