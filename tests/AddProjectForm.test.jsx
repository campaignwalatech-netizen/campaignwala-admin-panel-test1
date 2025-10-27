
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddOffersForm from '../src/adminDashboard/forms/AddProjectForm';
import { createOffer } from '../src/services/offerService';
import { getAllCategories } from '../src/services/categoryService';

// Mocking services
jest.mock('../src/services/offerService', () => ({
  createOffer: jest.fn(),
}));
jest.mock('../src/services/categoryService', () => ({
  getAllCategories: jest.fn(),
}));

// Mocking lucide-react icons
jest.mock('lucide-react', () => ({
  AlertCircle: () => <div data-testid="alert-icon" />,
}));

const mockCategories = [
  { _id: '1', name: 'Category A' },
  { _id: '2', name: 'Category B' },
];

beforeEach(() => {
  getAllCategories.mockResolvedValue({ success: true, data: { categories: mockCategories } });
  createOffer.mockClear();
});

describe('AddOffersForm', () => {
  test('renders the form with the correct title', async () => {
    render(<AddOffersForm />);
    expect(screen.getByText('Add New Offers')).toBeInTheDocument();
    await waitFor(() => expect(getAllCategories).toHaveBeenCalled());
  });

  test('fetches and displays categories', async () => {
    render(<AddOffersForm />);
    await waitFor(() => {
      expect(screen.getByText('Select Category')).toBeInTheDocument();
      expect(screen.getByText('Category A')).toBeInTheDocument();
      expect(screen.getByText('Category B')).toBeInTheDocument();
    });
  });

  test('shows loading state for categories', () => {
    getAllCategories.mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<AddOffersForm />);
    expect(screen.getByText('Loading categories...')).toBeInTheDocument();
  });

  test('shows error message if categories fail to load', async () => {
    getAllCategories.mockRejectedValue(new Error('Failed to load'));
    render(<AddOffersForm />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load categories')).toBeInTheDocument();
    });
  });

  test('submits the form with valid data', async () => {
    createOffer.mockResolvedValue({ success: true });
    render(<AddOffersForm />);
    await waitFor(() => expect(getAllCategories).toHaveBeenCalled());

    fireEvent.change(screen.getByLabelText('Offer Name'), { target: { value: 'Test Offer' } });
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Category A' } });
    fireEvent.change(screen.getByLabelText(/Commission 1/), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('Offer Description'), { target: { value: 'Test Description' } });

    fireEvent.submit(screen.getByText('Add Offer'));

    await waitFor(() => {
      expect(createOffer).toHaveBeenCalledWith({
        name: 'Test Offer',
        category: 'Category A',
        description: 'Test Description',
        commission1: '10',
        commission1Comment: '',
        commission2: '',
        commission2Comment: '',
        link: '',
        image: '',
        video: '',
        videoLink: '',
        termsAndConditions: ''
      });
      expect(screen.getByText('✅ Offer created successfully!')).toBeInTheDocument();
    });
  });

  test('shows validation error if commission 1 is missing', async () => {
    render(<AddOffersForm />);
    await waitFor(() => expect(getAllCategories).toHaveBeenCalled());

    fireEvent.change(screen.getByLabelText('Offer Name'), { target: { value: 'Test Offer' } });
    fireEvent.submit(screen.getByText('Add Offer'));

    await waitFor(() => {
      expect(screen.getByText('⚠️ Commission 1 is required!')).toBeInTheDocument();
      expect(createOffer).not.toHaveBeenCalled();
    });
  });

  test('resets the form when cancel is clicked', async () => {
    render(<AddOffersForm />);
    await waitFor(() => expect(getAllCategories).toHaveBeenCalled());

    fireEvent.change(screen.getByLabelText('Offer Name'), { target: { value: 'Test Offer' } });
    expect(screen.getByLabelText('Offer Name')).toHaveValue('Test Offer');

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.getByLabelText('Offer Name')).toHaveValue('');
  });
});
