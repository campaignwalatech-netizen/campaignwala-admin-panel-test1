
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddSlideForm from '../src/adminDashboard/forms/AddSlideForm';
import { useLocation, useNavigate } from 'react-router-dom';
import slideService from '../src/services/slideService';
import categoryService from '../src/services/categoryService';
import { getOffersByCategory } from '../src/services/offerService';

// Mocking services and hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));
jest.mock('../src/services/slideService', () => ({
  createSlide: jest.fn(),
  updateSlide: jest.fn(),
}));
jest.mock('../src/services/categoryService', () => ({
  getAllCategories: jest.fn(),
}));
jest.mock('../src/services/offerService', () => ({
  getOffersByCategory: jest.fn(),
}));

// Mocking lucide-react icons
jest.mock('lucide-react', () => ({
  Upload: () => <div data-testid="upload-icon" />,
  X: () => <div data-testid="x-icon" />,
  ImageIcon: () => <div data-testid="image-icon" />,
}));

const mockNavigate = jest.fn();
const mockCategories = [{ _id: 'cat1', name: 'Category 1' }];
const mockOffers = [{ _id: 'offer1', name: 'Offer 1', offersId: 'OFFER001' }];

beforeEach(() => {
  useLocation.mockReturnValue({ state: null });
  useNavigate.mockReturnValue(mockNavigate);
  categoryService.getAllCategories.mockResolvedValue({ success: true, data: { categories: mockCategories } });
  getOffersByCategory.mockResolvedValue({ success: true, data: mockOffers });
  slideService.createSlide.mockClear();
  slideService.updateSlide.mockClear();
  mockNavigate.mockClear();
  global.alert = jest.fn();
});

describe('AddSlideForm', () => {
  test('renders in "Add New Slide" mode', async () => {
    render(<AddSlideForm />);
    expect(screen.getByText('Add New Slide')).toBeInTheDocument();
    await waitFor(() => expect(categoryService.getAllCategories).toHaveBeenCalled());
  });

  test('renders in "Edit Slide" mode and fetches offers', async () => {
    const editSlide = {
      _id: 'slide1',
      offerTitle: 'Old Title',
      category: 'cat1',
      OffersId: 'OFFER001',
      backgroundImage: 'image.png',
      description: 'Old desc',
    };
    useLocation.mockReturnValue({ state: { editSlide } });
    render(<AddSlideForm />);

    expect(screen.getByText('Edit Slide')).toBeInTheDocument();
    expect(screen.getByLabelText(/Offer Title/)).toHaveValue('Old Title');
    await waitFor(() => expect(getOffersByCategory).toHaveBeenCalledWith('cat1'));
  });

  test('fetches offers when a category is selected', async () => {
    render(<AddSlideForm />);
    await waitFor(() => expect(categoryService.getAllCategories).toHaveBeenCalled());

    fireEvent.change(screen.getByLabelText(/Category/), { target: { value: 'cat1'} });

    await waitFor(() => expect(getOffersByCategory).toHaveBeenCalledWith('cat1'));
    await waitFor(() => expect(screen.getByText('Offer 1 - OFFER001')).toBeInTheDocument());
  });

  test('submits new slide data correctly', async () => {
    slideService.createSlide.mockResolvedValue({ success: true });
    render(<AddSlideForm />);
    await waitFor(() => expect(categoryService.getAllCategories).toHaveBeenCalled());

    fireEvent.change(screen.getByLabelText(/Offer Title/), { target: { value: 'New Slide' } });
    fireEvent.change(screen.getByLabelText(/Category/), { target: { value: 'cat1' } });
    await waitFor(() => expect(getOffersByCategory).toHaveBeenCalledWith('cat1'));
    fireEvent.change(screen.getByLabelText(/Offers ID/), { target: { value: 'OFFER001' } });

    // Mock file upload
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Background Image/);
    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);

    // Need to wait for FileReader to finish
    await new Promise(resolve => setTimeout(resolve, 100));

    fireEvent.submit(screen.getByText('Add Slide'));

    await waitFor(() => {
      expect(slideService.createSlide).toHaveBeenCalledWith(expect.objectContaining({ offerTitle: 'New Slide' }));
      expect(global.alert).toHaveBeenCalledWith('Slide added successfully!');
      expect(mockNavigate).toHaveBeenCalledWith('/admin/slides');
    });
  });

  test('shows validation alert if required fields are missing', async () => {
    render(<AddSlideForm />);
    fireEvent.submit(screen.getByText('Add Slide'));
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('❌ Please fill all required fields!');
    });
  });

  test('resets the form when reset button is clicked', async () => {
    render(<AddSlideForm />);
    fireEvent.change(screen.getByLabelText(/Offer Title/), { target: { value: 'Some Title' } });
    expect(screen.getByLabelText(/Offer Title/)).toHaveValue('Some Title');

    fireEvent.click(screen.getByText('Reset'));

    expect(screen.getByLabelText(/Offer Title/)).toHaveValue('');
  });
});
