
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AllSlidesTable from '../src/adminDashboard/forms/AllSlidesTable';
import { useNavigate } from 'react-router-dom';
import slideService from '../src/services/slideService';

// Mocking services and hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('../src/services/slideService', () => ({
  getAllSlides: jest.fn(),
  deleteSlide: jest.fn(),
}));

// Mocking lucide-react icons
jest.mock('lucide-react', () => ({
  Edit2: () => <div data-testid="edit-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
  X: () => <div data-testid="x-icon" />,
  Eye: () => <div data-testid="eye-icon" />,
  Image: () => <div data-testid="image-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  Upload: () => <div data-testid="upload-icon" />,
}));

const mockNavigate = jest.fn();
const mockSlides = [
  { _id: '1', offerTitle: 'Slide 1', category: { name: 'Category A' }, description: 'Desc 1', status: 'active', views: 100, createdAt: new Date().toISOString(), backgroundImage: 'img1.jpg' },
  { _id: '2', offerTitle: 'Slide 2', category: { name: 'Category B' }, description: 'Desc 2', status: 'inactive', views: 200, createdAt: new Date().toISOString(), backgroundImage: 'img2.jpg' },
];

beforeEach(() => {
  useNavigate.mockReturnValue(mockNavigate);
  slideService.getAllSlides.mockResolvedValue({ success: true, data: { slides: mockSlides } });
  slideService.deleteSlide.mockClear();
  mockNavigate.mockClear();
  global.alert = jest.fn();
});

describe('AllSlidesTable', () => {
  test('renders and fetches slides', async () => {
    render(<AllSlidesTable />);
    expect(screen.getByText('Slide Board')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
      expect(screen.getByText('Slide 2')).toBeInTheDocument();
    });
  });

  test('searches for a slide', async () => {
    render(<AllSlidesTable />);
    await waitFor(() => expect(slideService.getAllSlides).toHaveBeenCalled());

    fireEvent.change(screen.getByPlaceholderText(/Search by title/), { target: { value: 'Slide 1' } });

    await waitFor(() => {
      expect(slideService.getAllSlides).toHaveBeenCalledWith(expect.objectContaining({ search: 'Slide 1' }));
    }, { timeout: 600 }); // Wait for debounce
  });

  test('opens delete modal and cancels', async () => {
    render(<AllSlidesTable />);
    await waitFor(() => expect(screen.getByText('Slide 1')).toBeInTheDocument());

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Cancel')[0]);

    expect(screen.queryByText('Confirm Delete')).not.toBeInTheDocument();
  });

  test('deletes a slide', async () => {
    slideService.deleteSlide.mockResolvedValue({ success: true });
    render(<AllSlidesTable />);
    await waitFor(() => expect(screen.getByText('Slide 1')).toBeInTheDocument());

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Delete')[1]);

    await waitFor(() => {
      expect(slideService.deleteSlide).toHaveBeenCalledWith('1');
      expect(screen.getByText(/deleted successfully!/)).toBeInTheDocument();
    });
  });

  test('navigates to edit page', async () => {
    render(<AllSlidesTable />);
    await waitFor(() => expect(screen.getByText('Slide 1')).toBeInTheDocument());

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/admin/add-slide', {
      state: { editSlide: mockSlides[0] },
    });
  });

  test('handles API error on fetch', async () => {
    slideService.getAllSlides.mockRejectedValue(new Error('Failed to load'));
    render(<AllSlidesTable />);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Failed to load slides');
    });
  });
});
