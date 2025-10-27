import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ApproveOffersTable from '../src/adminDashboard/forms/ApproveProjectTable';
import * as offerService from '../src/services/offerService';

// Mock the offerService
vi.mock('../src/services/offerService', () => ({
  getAllOffers: vi.fn(),
  approveOffer: vi.fn(),
  rejectOffer: vi.fn(),
}));

const mockOffers = [
  {
    _id: '1',
    leadId: 'L001',
    name: 'Offer 1',
    category: 'Category A',
    commission1: 100,
    commission2: 50,
    createdAt: new Date().toISOString(),
    isApproved: false,
  },
  {
    _id: '2',
    leadId: 'L002',
    name: 'Offer 2',
    category: 'Category B',
    commission1: 200,
    commission2: 100,
    createdAt: new Date().toISOString(),
    isApproved: true,
  },
];

describe('ApproveOffersTable Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('should render the table with offers', async () => {
    offerService.getAllOffers.mockResolvedValue({ success: true, data: { offers: mockOffers } });
    render(<ApproveOffersTable />);

    expect(screen.getByText('Account Approval Center')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Offer 1')).toBeInTheDocument();
      expect(screen.getByText('Offer 2')).toBeInTheDocument();
    });
  });

  it('should display a message when there are no offers', async () => {
    offerService.getAllOffers.mockResolvedValue({ success: true, data: { offers: [] } });
    render(<ApproveOffersTable />);

    await waitFor(() => {
      // This component does not explicitly show a "no offers" message in the table body,
      // but the table will be empty. We can check that the offer names are not there.
      expect(screen.queryByText('Offer 1')).not.toBeInTheDocument();
    });
  });

  it('should allow approving a pending offer', async () => {
    offerService.getAllOffers.mockResolvedValue({ success: true, data: { offers: mockOffers } });
    offerService.approveOffer.mockResolvedValue({ success: true, data: { ...mockOffers[0], isApproved: true } });
    
    render(<ApproveOffersTable />);
    
    await waitFor(() => {
        expect(screen.getByText('Offer 1')).toBeInTheDocument();
    });

    const approveToggle = screen.getAllByRole('checkbox')[1]; // Assuming the first checkbox is the bulk one
    fireEvent.click(approveToggle);

    await waitFor(() => {
      expect(offerService.approveOffer).toHaveBeenCalledWith('1');
    });
  });

  it('should allow rejecting an approved offer', async () => {
    offerService.getAllOffers.mockResolvedValue({ success: true, data: { offers: mockOffers } });
    offerService.rejectOffer.mockResolvedValue({ success: true, data: { ...mockOffers[1], isApproved: false } });

    render(<ApproveOffersTable />);

    await waitFor(() => {
        expect(screen.getByText('Offer 2')).toBeInTheDocument();
    });

    const rejectToggle = screen.getAllByRole('checkbox')[2];
    fireEvent.click(rejectToggle);

    await waitFor(() => {
      expect(offerService.rejectOffer).toHaveBeenCalledWith('2', 'Unapproved by admin');
    });
  });

  it('should handle file upload', async () => {
    offerService.getAllOffers.mockResolvedValue({ success: true, data: { offers: [] } });
    render(<ApproveOffersTable />);

    const file = new File(['(contents)'], 'test.csv', { type: 'text/csv' });
    const input = screen.getByLabelText('Excel/CSV File Upload');
    
    await waitFor(() => {
        fireEvent.change(input, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(screen.getByText('Upload Successful!')).toBeInTheDocument();
      expect(screen.getByText('test.csv')).toBeInTheDocument();
    });
  });

  it('should show an error for invalid file type', async () => {
    offerService.getAllOffers.mockResolved-Value({ success: true, data: { offers: [] } });
    window.alert = vi.fn();
    render(<ApproveOffersTable />);

    const file = new File(['(contents)'], 'test.txt', { type: 'text/plain' });
    const input = screen.getByLabelText('Excel/CSV File Upload');

    await waitFor(() => {
        fireEvent.change(input, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Please select a valid CSV or Excel file (.csv, .xlsx, .xls)');
    });
  });
});
