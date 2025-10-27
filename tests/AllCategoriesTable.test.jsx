
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AllCategoriesTable from '../src/adminDashboard/forms/AllCategoriesTable';
import { useNavigate } from 'react-router-dom';
import { getAllCategories, deleteCategory } from '../src/services/categoryService';

// Mocking services and hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('../src/services/categoryService', () => ({
  getAllCategories: jest.fn(),
  deleteCategory: jest.fn(),
}));

// Mocking lucide-react icons
jest.mock('lucide-react', () => ({
  Edit2: () => <div data-testid="edit-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
  X: () => <div data-testid="x-icon" />,
  Download: () => <div data-testid="download-icon" />,
  Search: () => <div data-testid="search-icon" />,
  Filter: () => <div data-testid="filter-icon" />,
  Loader2: () => <div data-testid="loader-icon" />,
}));

const mockNavigate = jest.fn();
const mockCategories = [
  { _id: '1', name: 'Electronics', description: 'Gadgets and devices', count: 10, status: 'active', createdAt: new Date().toISOString() },
  { _id: '2', name: 'Books', description: 'Novels and comics', count: 5, status: 'inactive', createdAt: new Date().toISOString() },
];

beforeEach(() => {
  useNavigate.mockReturnValue(mockNavigate);
  getAllCategories.mockResolvedValue({ success: true, data: { categories: mockCategories } });
  deleteCategory.mockClear();
  mockNavigate.mockClear();
  global.alert = jest.fn();
});

describe('AllCategoriesTable', () => {
  test('renders and fetches categories', async () => {
    render(<AllCategoriesTable />);
    expect(screen.getByText('Loading categories...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('All Categories')).toBeInTheDocument();
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Books')).toBeInTheDocument();
    });
  });

  test('searches for a category', async () => {
    render(<AllCategoriesTable />);
    await waitFor(() => expect(getAllCategories).toHaveBeenCalled());

    fireEvent.change(screen.getByPlaceholderText('Search categories...'), { target: { value: 'Elec' } });

    await waitFor(() => {
      expect(getAllCategories).toHaveBeenCalledWith(expect.objectContaining({ search: 'Elec' }));
    });
  });

  test('filters categories by status', async () => {
    render(<AllCategoriesTable />);
    await waitFor(() => expect(getAllCategories).toHaveBeenCalled());

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'active' } });

    await waitFor(() => {
      expect(getAllCategories).toHaveBeenCalledWith(expect.objectContaining({ status: 'active' }));
    });
  });

  test('opens delete modal and cancels', async () => {
    render(<AllCategoriesTable />);
    await waitFor(() => expect(screen.getByText('Electronics')).toBeInTheDocument());

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Cancel')[1]); // There is another cancel button in the form

    expect(screen.queryByText('Confirm Delete')).not.toBeInTheDocument();
  });

  test('deletes a category', async () => {
    deleteCategory.mockResolvedValue({ success: true });
    render(<AllCategoriesTable />);
    await waitFor(() => expect(screen.getByText('Electronics')).toBeInTheDocument());

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Delete')[1]);

    await waitFor(() => {
      expect(deleteCategory).toHaveBeenCalledWith('1');
      expect(global.alert).toHaveBeenCalledWith('Category deleted successfully!');
    });
  });

  test('navigates to edit page', async () => {
    render(<AllCategoriesTable />);
    await waitFor(() => expect(screen.getByText('Electronics')).toBeInTheDocument());

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/admin/add-category', {
      state: { editCategory: mockCategories[0] },
    });
  });

  test('navigates to add new page', () => {
    render(<AllCategoriesTable />);
    fireEvent.click(screen.getByTitle('Add New Category'));
    expect(mockNavigate).toHaveBeenCalledWith('/admin/add-category');
  });

  test('handles API error on fetch', async () => {
    getAllCategories.mockRejectedValue({ response: { data: { message: 'Network Error' } } });
    render(<AllCategoriesTable />);
    await waitFor(() => {
      expect(screen.getByText('Error Loading Categories')).toBeInTheDocument();
      expect(screen.getByText('Network Error')).toBeInTheDocument();
    });
  });
});
