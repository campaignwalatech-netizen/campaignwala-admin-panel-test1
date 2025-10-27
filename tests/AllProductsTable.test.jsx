
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AllOffersTable from '../src/adminDashboard/forms/AllProductsTable';
import { getAllOffers, deleteOffer, updateOffer } from '../src/services/offerService';
import { getAllCategories } from '../src/services/categoryService';

// Mocking services
jest.mock('../src/services/offerService', () => ({
  getAllOffers: jest.fn(),
  deleteOffer: jest.fn(),
  updateOffer: jest.fn(),
}));
jest.mock('../src/services/categoryService', () => ({
  getAllCategories: jest.fn(),
}));

// Mocking lucide-react icons
jest.mock('lucide-react', () => ({
  Edit2: () => <div data-testid="edit-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
  X: () => <div data-testid="x-icon" />,
  Download: () => <div data-testid="download-icon" />,
  Search: () => <div data-testid="search-icon" />,
  Filter: () => <div data-testid="filter-icon" />,
  Upload: () => <div data-testid="upload-icon" />,
  CheckCircle: () => <div data-testid="check-circle-icon" />,
  Copy: () => <div data-testid="copy-icon" />,
  Video: () => <div data-testid="video-icon" />,
  Loader2: () => <div data-testid="loader-icon" />,
  Link: () => <div data-testid="link-icon" />,
}));

const mockOffers = [
  { _id: '1', name: 'Offer A', category: 'Cat A', latestStage: 'Pending', commission1: '10%', commission2: '5%', isApproved: true, createdAt: new Date().toISOString(), link: 'http://example.com/a' },
  { _id: '2', name: 'Offer B', category: 'Cat B', latestStage: 'Completed', commission1: '12%', commission2: '', isApproved: false, createdAt: new Date().toISOString(), link: 'http://example.com/b' },
];
const mockCategories = [{ _id: '1', name: 'Cat A' }, { _id: '2', name: 'Cat B' }];

beforeEach(() => {
  getAllOffers.mockResolvedValue({ success: true, data: { offers: mockOffers } });
  getAllCategories.mockResolvedValue({ success: true, data: { categories: mockCategories } });
  deleteOffer.mockClear();
  updateOffer.mockClear();
  global.alert = jest.fn();
  // Mock clipboard API
  Object.assign(navigator, { clipboard: { writeText: jest.fn().mockResolvedValue() } });
});

describe('AllOffersTable', () => {
  test('renders and fetches offers and categories', async () => {
    render(<AllOffersTable />);
    expect(screen.getByText('Loading offers...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('All Offers')).toBeInTheDocument();
      expect(screen.getByText('Offer A')).toBeInTheDocument();
      expect(screen.getByText('Offer B')).toBeInTheDocument();
    });
  });

  test('searches for an offer', async () => {
    render(<AllOffersTable />);
    await waitFor(() => expect(getAllOffers).toHaveBeenCalled());

    fireEvent.change(screen.getByPlaceholderText('Search offers...'), { target: { value: 'Offer A' } });

    await waitFor(() => {
      expect(getAllOffers).toHaveBeenCalledWith(expect.objectContaining({ search: 'Offer A' }));
    });
  });

  test('filters offers by status', async () => {
    render(<AllOffersTable />);
    await waitFor(() => expect(getAllOffers).toHaveBeenCalled());

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'true' } });

    await waitFor(() => {
      expect(getAllOffers).toHaveBeenCalledWith(expect.objectContaining({ isApproved: 'true' }));
    });
  });

  test('opens and closes the edit modal', async () => {
    render(<AllOffersTable />);
    await waitFor(() => expect(screen.getByText('Offer A')).toBeInTheDocument());

    const editButtons = screen.getAllByTestId('edit-icon');
    fireEvent.click(editButtons[0]);

    expect(screen.getByText('Edit Offer')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Cancel')[1]);

    expect(screen.queryByText('Edit Offer')).not.toBeInTheDocument();
  });

  test('updates an offer', async () => {
    updateOffer.mockResolvedValue({ success: true, data: { ...mockOffers[0], name: 'Updated Offer A' } });
    render(<AllOffersTable />);
    await waitFor(() => expect(screen.getByText('Offer A')).toBeInTheDocument());

    const editButtons = screen.getAllByTestId('edit-icon');
    fireEvent.click(editButtons[0]);

    fireEvent.change(screen.getByDisplayValue('Offer A'), { target: { value: 'Updated Offer A' } });
    fireEvent.click(screen.getByText('Update Offer'));

    await waitFor(() => {
      expect(updateOffer).toHaveBeenCalledWith('1', expect.objectContaining({ name: 'Updated Offer A' }));
      expect(screen.getByText(/updated successfully!/)).toBeInTheDocument();
    });
  });

  test('deletes an offer', async () => {
    deleteOffer.mockResolvedValue({ success: true });
    render(<AllOffersTable />);
    await waitFor(() => expect(screen.getByText('Offer A')).toBeInTheDocument());

    const deleteButtons = screen.getAllByTestId('trash-icon');
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Delete')[1]);

    await waitFor(() => {
      expect(deleteOffer).toHaveBeenCalledWith('1');
      expect(screen.getByText(/deleted successfully!/)).toBeInTheDocument();
    });
  });

  test('copies link to clipboard', async () => {
    render(<AllOffersTable />);
    await waitFor(() => expect(screen.getByText('Offer A')).toBeInTheDocument());

    const copyButtons = screen.getAllByTitle('Copy Link');
    fireEvent.click(copyButtons[0]);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://example.com/a');
      expect(screen.getByText('Link copied to clipboard!')).toBeInTheDocument();
    });
  });
});
