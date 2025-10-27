
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AllOffersTable from '../../../../src/adminDashboard/forms/AllProductsTable';
import { getAllOffers, deleteOffer, updateOffer } from '../../../../src/services/offerService';
import { getAllCategories } from '../../../../src/services/categoryService';

// Mock services
vi.mock('../../../../src/services/offerService');
vi.mock('../../../../src/services/categoryService');

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe('AllOffersTable Component', () => {
  const mockOffers = [
    { _id: '1', name: 'Offer 1', category: 'Cat A', isApproved: true, createdAt: new Date().toISOString(), link: 'https://example.com' },
    { _id: '2', name: 'Offer 2', category: 'Cat B', isApproved: false, createdAt: new Date().toISOString() },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    getAllOffers.mockResolvedValue({ success: true, data: { offers: mockOffers } });
    getAllCategories.mockResolvedValue({ success: true, data: { categories: [] } });
    deleteOffer.mockResolvedValue({ success: true });
    updateOffer.mockResolvedValue({ success: true, data: { ...mockOffers[0], name: 'Updated Offer' } });
  });

  const renderComponent = () => {
    return render(<AllOffersTable />);
  };

  it('should load and display offers', async () => {
    renderComponent();
    expect(screen.getByText(/loading offers/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Offer 1')).toBeInTheDocument();
      expect(screen.getByText('Offer 2')).toBeInTheDocument();
    });
  });

  it('should open the delete modal and delete an offer', async () => {
    renderComponent();
    await waitFor(() => screen.getByText('Offer 1'));

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByText(/confirm delete/i)).toBeInTheDocument();

    const confirmButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(deleteOffer).toHaveBeenCalledWith('1');
      expect(screen.getByText(/deleted successfully/i)).toBeInTheDocument();
      expect(screen.queryByText('Offer 1')).not.toBeInTheDocument();
    });
  });

  it('should open the edit modal and update an offer', async () => {
    renderComponent();
    await waitFor(() => screen.getByText('Offer 1'));

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    expect(screen.getByText('Edit Offer')).toBeInTheDocument();
    const nameInput = screen.getByDisplayValue('Offer 1');
    fireEvent.change(nameInput, { target: { value: 'Updated Offer' } });

    const updateButton = screen.getByRole('button', { name: /update offer/i });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(updateOffer).toHaveBeenCalledWith('1', expect.any(Object));
      expect(screen.getByText(/updated successfully/i)).toBeInTheDocument();
      expect(screen.getByText('Updated Offer')).toBeInTheDocument();
    });
  });

  it('should copy link to clipboard', async () => {
    renderComponent();
    await waitFor(() => screen.getByText('Offer 1'));

    const copyButton = screen.getAllByTitle('Copy Link')[0];
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('https://example.com');
    await waitFor(() => {
      expect(screen.getByText(/link copied to clipboard/i)).toBeInTheDocument();
    });
  });
});
