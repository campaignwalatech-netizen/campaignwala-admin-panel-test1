import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PaymentWithdrawalTable from '../src/adminDashboard/forms/PaymentWithdrawalTable';

describe('PaymentWithdrawalTable Component', () => {
  it('should render the table with withdrawal requests', () => {
    render(<PaymentWithdrawalTable />);

    expect(screen.getByText('Payment Withdrawal Requests')).toBeInTheDocument();
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Williams')).toBeInTheDocument();
  });

  it('should filter requests based on search term', () => {
    render(<PaymentWithdrawalTable />);

    const searchInput = screen.getByPlaceholderText('Search by Lead ID or Name...');
    fireEvent.change(searchInput, { target: { value: 'Alice' } });

    // This component does client-side filtering, so we need to wait for re-render if it was async
    // Since it is synchronous, we can assert directly.
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.queryByText('Bob Williams')).not.toBeInTheDocument();
  });

  it('should filter requests by status', () => {
    render(<PaymentWithdrawalTable />);

    const filterSelect = screen.getByRole('combobox');
    fireEvent.change(filterSelect, { target: { value: 'Pending' } });

    expect(screen.getByText('Bob Williams')).toBeInTheDocument();
    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
  });

  it('should open the details modal when "View Details" is clicked', async () => {
    render(<PaymentWithdrawalTable />);

    const viewButtons = screen.getAllByText('View Details');
    fireEvent.click(viewButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Withdrawal Details')).toBeInTheDocument();
      expect(screen.getByText('LID001')).toBeInTheDocument();
    });
  });

  it('should approve a withdrawal request', async () => {
    window.alert = vi.fn();
    render(<PaymentWithdrawalTable />);

    const viewButtons = screen.getAllByText('View Details');
    fireEvent.click(viewButtons[1]); // Click on Bob Williams (Pending)

    await waitFor(() => {
        expect(screen.getByText('Withdrawal Details')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Approve'));
    
    const transactionIdInput = screen.getByPlaceholderText('Enter transaction ID (e.g., TXN123456)');
    fireEvent.change(transactionIdInput, { target: { value: 'TXN123' } });

    fireEvent.click(screen.getByText('Confirm Approval'));

    await waitFor(() => {
        const bobRow = screen.getByText('Bob Williams').closest('tr');
        expect(bobRow).toHaveTextContent('Approved');
        expect(bobRow).toHaveTextContent('TXN: TXN123');
    });
  });

  it('should reject a withdrawal request', async () => {
    window.alert = vi.fn();
    render(<PaymentWithdrawalTable />);

    const viewButtons = screen.getAllByText('View Details');
    fireEvent.click(viewButtons[1]); // Click on Bob Williams (Pending)

    await waitFor(() => {
        expect(screen.getByText('Withdrawal Details')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Reject'));

    const reasonInput = screen.getByPlaceholderText('Enter reason for rejection...');
    fireEvent.change(reasonInput, { target: { value: 'Invalid request' } });

    fireEvent.click(screen.getByText('Confirm Rejection'));

    await waitFor(() => {
        const bobRow = screen.getByText('Bob Williams').closest('tr');
        expect(bobRow).toHaveTextContent('Rejected');
        expect(bobRow).toHaveTextContent('Invalid request');
    });
  });
});
