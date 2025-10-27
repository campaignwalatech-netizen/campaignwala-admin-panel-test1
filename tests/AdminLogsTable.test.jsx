
import { render, screen, fireEvent } from '@testing-library/react';
import AdminLogsTable from '../src/adminDashboard/forms/AdminLogsTable';

// Mocking lucide-react icons
jest.mock('lucide-react', () => ({
  Eye: () => <div data-testid="eye-icon" />,
  X: () => <div data-testid="x-icon" />,
}));

describe('AdminLogsTable', () => {
  test('renders the table with logs', () => {
    render(<AdminLogsTable />);
    expect(screen.getByText('Admin Activity Logs')).toBeInTheDocument();
    expect(screen.getByText('Updated Offers #145')).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(9); // Header row + 8 log rows
  });

  test('opens and closes the details modal', () => {
    render(<AdminLogsTable />);
    const viewButtons = screen.getAllByText('View Details');
    fireEvent.click(viewButtons[0]);

    expect(screen.getByText('Admin Log Details')).toBeInTheDocument();

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Admin Log Details')).not.toBeInTheDocument();
  });

  test('displays correct log details in the modal', () => {
    render(<AdminLogsTable />);
    const viewButtons = screen.getAllByText('View Details');
    fireEvent.click(viewButtons[1]); // Click on the second log

    expect(screen.getByText('Admin Log Details')).toBeInTheDocument();
    expect(screen.getByText('#2')).toBeInTheDocument();
    expect(screen.getByText('Admin Manager')).toBeInTheDocument();
    expect(screen.getByText('Approved Payment Withdrawal #23')).toBeInTheDocument();
    expect(screen.getByText('2024-10-18 13:45:22')).toBeInTheDocument();
    expect(screen.getByText('192.168.1.101')).toBeInTheDocument();
    expect(screen.getByText('success')).toBeInTheDocument();
    expect(screen.getByText(/Approved withdrawal request for user John Doe/)).toBeInTheDocument();
  });

  test('export logs button is present', () => {
    render(<AdminLogsTable />);
    expect(screen.getByText('Export Logs')).toBeInTheDocument();
  });
});
