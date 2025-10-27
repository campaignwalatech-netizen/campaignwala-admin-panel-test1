import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import KYCReview from '../src/adminDashboard/forms/KYCReview';

describe('KYCReview Component', () => {
  it('should render the table with pending applications', () => {
    render(<KYCReview />);

    expect(screen.getByText('KYC Review - Pending Applications')).toBeInTheDocument();
    expect(screen.getByText('Aarav Sharma')).toBeInTheDocument();
    expect(screen.getByText('Priya Patel')).toBeInTheDocument();
  });

  it('should filter users based on search term', () => {
    render(<KYCReview />);

    const searchInput = screen.getByPlaceholderText('Search users by name, email, or ID...');
    fireEvent.change(searchInput, { target: { value: 'Aarav' } });

    expect(screen.getByText('Aarav Sharma')).toBeInTheDocument();
    expect(screen.queryByText('Priya Patel')).not.toBeInTheDocument();
  });

  it('should show details view when "View Details" is clicked', () => {
    render(<KYCReview />);

    const viewButtons = screen.getAllByText('View Details');
    fireEvent.click(viewButtons[0]);

    expect(screen.getByText('KYC Review - Aarav Sharma')).toBeInTheDocument();
    expect(screen.getByText('User Details')).toBeInTheDocument();
    expect(screen.getByText('PAN Card Details')).toBeInTheDocument();
    expect(screen.getByText('Bank Account Details')).toBeInTheDocument();
  });

  it('should approve KYC when "Approve KYC" is clicked', async () => {
    window.alert = vi.fn();
    render(<KYCReview />);

    const viewButtons = screen.getAllByText('View Details');
    fireEvent.click(viewButtons[0]);

    const approveButton = screen.getByText('Approve KYC');
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('KYC approved for Aarav Sharma');
    });

    // Should be back to the table view
    expect(screen.getByText('KYC Review - Pending Applications')).toBeInTheDocument();
  });

  it('should reject KYC when "Reject KYC" is clicked with a reason', async () => {
    window.alert = vi.fn();
    window.prompt = vi.fn(() => 'Incorrect details');
    render(<KYCReview />);

    const viewButtons = screen.getAllByText('View Details');
    fireEvent.click(viewButtons[0]);

    const rejectButton = screen.getByText('Reject KYC');
    fireEvent.click(rejectButton);

    await waitFor(() => {
      expect(window.prompt).toHaveBeenCalledWith('Please enter reason for rejection:');
      expect(window.alert).toHaveBeenCalledWith('KYC rejected for Aarav Sharma');
    });

    // Should be back to the table view
    expect(screen.getByText('KYC Review - Pending Applications')).toBeInTheDocument();
  });

  it('should go back to the table view when "Back to List" is clicked', () => {
    render(<KYCReview />);

    const viewButtons = screen.getAllByText('View Details');
    fireEvent.click(viewButtons[0]);

    // Now in details view
    expect(screen.getByText('KYC Review - Aarav Sharma')).toBeInTheDocument();

    const backButton = screen.getByText('Back to List');
    fireEvent.click(backButton);

    // Should be back to the table view
    expect(screen.getByText('KYC Review - Pending Applications')).toBeInTheDocument();
  });
});
